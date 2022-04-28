import React, { useState } from 'react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { VolunteerUpdateMethod } from '../../api/user/VolunteerProfileCollection.methods';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */

const UsernameChange = ({ location }) => {
  const formSchema = new SimpleSchema({
    username: String,

  });
  const bridge = new SimpleSchema2Bridge(formSchema);
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  function match(newusername, confirmusername) { // for match the password and confirm password value.
    if (newusername === confirmusername) {
      return false;
    }
    return true;
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  // eslint-disable-next-line consistent-return
  const submit = (data, formRef) => {
    const result = Meteor.user({ fields: { username: 1 } }).username;
    if (match(data.username, result)) {
      VolunteerUpdateMethod.callPromise({ userId: Meteor.userId(), newName: data.username }).catch(error => swal('Error', error.message, 'error'));
      formRef.reset();
      swal({
        title: 'Changed Applied!',
        text: 'You have successfully changed your username!',
        icon: 'success',
      });
      setRedirectToReferer(true);
    } else {
      swal('Error!', 'Same username!', 'error');
    }
  };
  const { from } = location.state || { from: { pathname: '/signin' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  let fRef = null;
  return (
    <Container id={PAGE_IDS.USERNAME_CHANGE}>
      <div className="volunteer-sign-up-top">
        <Header as="h2" textAlign="center" inverted>
          Change Username
        </Header>
      </div>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <div>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Segment stacked basic>
                <TextField required
                  label="New Username"
                  id={COMPONENT_IDS.NEW_PASSWORD}
                  name="username"
                  placeholder="username"

                />
                <SubmitField value='Submit' id={COMPONENT_IDS.FORM_SUBMIT}/>
                <ErrorsField />
              </Segment>
            </AutoForm>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
UsernameChange.propTypes = {
  location: PropTypes.object,
};
export default UsernameChange;
