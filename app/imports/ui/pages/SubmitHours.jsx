import React, { useState } from 'react';
import { Grid, Loader, Header, Segment, Container, Card, Icon } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(VolunteerProfiles._schema);

/** Renders the Page for editing a single document. */
const EditMyProfile = ({ volProfile, ready, location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, dateOfBirth, genderType, address, city, state, zip, phone, hours, interestsType, skillsType, preferencesType, availabilityType, image, _id } = data;
    const collectionName = VolunteerProfiles.getCollectionName();
    const updateData = { id: _id, firstName, lastName, dateOfBirth, genderType, address, city, state, zip, phone, hours, interestsType, skillsType, preferencesType, availabilityType, image };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Profile updated successfully', 'success'));
    setRedirectToReferer(true);
  };
  /* Display the signup form. Redirect my profile page . */
  const { from } = location.state || { from: { pathname: '/myProfile' } };
  // if correct authentication, redirect to from: page instead of edit screen
  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  return (ready) ? (
    <Container id={PAGE_IDS.EDIT_MY_PROFILE}>
      <div className="organization-sign-up-top">
        <Header as="h2" textAlign="center" inverted>
          Submit Your Hours
        </Header>
        <Header as="h5" textAlign="center" inverted>
          Current Hours Volunteered: {volProfile.hours}
        </Header>
      </div>
      <br/>
      <br/>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <div className="orgnization-signup-form">
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={volProfile}>
              <Segment stacked basic>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                      Primary Information
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <TextField label='Submit Hours' name='hours'/>
                  </Card.Content>
                </Card>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

// Require the presence of a Opportunity document in the props object. Uniforms adds 'model' to the props, which we use.
EditMyProfile.propTypes = {
  volProfile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  const subscription = VolunteerProfiles.subscribe();
  const ready = subscription.ready();
  const volProfile = ready ? VolunteerProfiles.findDoc({ username: currentUser }) : undefined;
  return {
    volProfile,
    ready,
  };
})(EditMyProfile);
