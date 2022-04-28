import React, { useState } from 'react';
import { Form, Segment, Container, Header, Grid } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Accounts } from 'meteor/accounts-base';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import { Redirect } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const PasswordChang = ({ location }) => {

  const formSchema = new SimpleSchema({
    password: String,
  });

  const bridge = new SimpleSchema2Bridge(formSchema);
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [oldPass, setOldPass] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  function match(password1, password2) { // for match the password and confirm password value.
    if (password1 === password2) {
      return true;
    }
    swal('Error!', 'Password and confirm password does not match', 'error');
    return false;
  }

  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'confirmPassword':
      setConfirmPassword(value);
      break;
    case 'oldPassword':
      setOldPass(value);
      break;
    default:
          // do nothing.
    }
  };

  const submit = (data, formRef) => {
    if (match(data.password, confirmPassword)) {
      Accounts.changePassword(oldPass, confirmPassword, (error) => {
        if (typeof error === 'undefined') {
          formRef.reset();
          swal({
            title: 'Changed Applied!',
            text: 'You have successfully changed your password!',
            icon: 'success',
          });
          setRedirectToReferer(true);
          return true;
        }
        if (error) {
          swal({
            title: 'Change Failure!',
            text: `You have unsuccessfully changed your password - ${error.reason}`,
            icon: 'error',
          });
          return false;
        }
        return undefined;
      });
    } else {
    // do nothing
    }
  };
  const { from } = location.state || { from: { pathname: '/signin' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  let fRef = null;

  return (
    <Container id={PAGE_IDS.PASSWORD_CHANGE}>
      <div className="volunteer-sign-up-top">
        <Header as="h2" textAlign="center" inverted>
        Password Change
        </Header>
      </div>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <div>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Segment stacked basic>
                <Form.Input required
                  type='password'
                  label='Old Password'
                  id={COMPONENT_IDS.OLD_PASSWORD}
                  name='oldPassword'
                  placeholder='Old Password'
                  onChange={handleChange}
                />
                <TextField
                  label='New Password'
                  type='password'
                  id={COMPONENT_IDS.NEW_PASSWORD}
                  name="password"
                  placeholder="Password"
                />
                <Form.Input required
                  label="Confirm New Password"
                  id={COMPONENT_IDS.CONFIRM_PASSWORD}
                  icon="lock"
                  iconPosition="left"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={handleChange}
                />
                <SubmitField value='Apply Changes' id={COMPONENT_IDS.FORM_SUBMIT}/>
                <ErrorsField />
              </Segment>
            </AutoForm>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
/* Ensure that the React Router location object is available in case we need to redirect. */
PasswordChang.propTypes = {
  location: PropTypes.object,
};
export default PasswordChang;
