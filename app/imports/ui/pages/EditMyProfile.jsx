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
import RadioField from '../components/form-fields/RadioField';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import ImageUploadFiled from '../components/form-fields/ImageUploadFiled';

const bridge = new SimpleSchema2Bridge(VolunteerProfiles._schema);

/** Renders the Page for editing a single document. */
const EditMyProfile = ({ volProfile, ready, location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, dateOfBirth, genderType, address, city, state, zip, phone, interestsType, skillsType, preferencesType, availabilityType, image, _id } = data;
    const collectionName = VolunteerProfiles.getCollectionName();
    const updateData = { id: _id, firstName, lastName, dateOfBirth, genderType, address, city, state, zip, phone, interestsType, skillsType, preferencesType, availabilityType, image };
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
          Edit My Profile
        </Header>
        <Header as="h5" textAlign="center" inverted>
          Modify your listing
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
                    <TextField label='First Name' name='firstName'/>
                  </Card.Content>
                  <Card.Content>
                    <TextField label='Last Name' name='lastName'/>
                  </Card.Content>
                  <Card.Content>
                    <RadioField label='Gender' name='genderType'/>
                  </Card.Content>
                  <Card.Content>
                    <TextField label='Date of Birth' name='dateOfBirth'/>
                  </Card.Content>
                  <Card.Content>
                    <ImageUploadFiled label='My Profile Image' name='image'/>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                      Contact Information
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <TextField label='Phone' name='phone' placeholder='**********'/>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                      Primary Address
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <TextField label='address' name='address' placeholder='address'/>
                    <TextField label='city' name='city' placeholder='HI'/>
                    <TextField label='state' name='state' placeholder='Honolulu'/>
                    <TextField label='zip' name='zip' placeholder='96817'/>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                      Addition Information
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <RadioField label='Environmental' name='preferencesType' placeholder='environment preferences'/>
                  </Card.Content>
                  <Card.Content>
                    <MultiSelectField label='Interests' name='interestsType'/>
                  </Card.Content>
                  <Card.Content>
                    <MultiSelectField label='Skills' name='skillsType'/>
                  </Card.Content>
                  <Card.Content>
                    <RadioField label='availability' name='availabilityType'/>
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
