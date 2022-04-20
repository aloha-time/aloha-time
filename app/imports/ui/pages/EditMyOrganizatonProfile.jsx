import React, { useState } from 'react';
import { Grid, Loader, Header, Segment, Container, Card, Icon } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import {
  AutoForm,
  ErrorsField, LongTextField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import RadioField from '../components/form-fields/RadioField';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import ImageUploadFiled from '../components/form-fields/ImageUploadFiled';

const bridge = new SimpleSchema2Bridge(OrganizationProfiles._schema);

/** Renders the Page for editing a single document. */
const EditMyOrganizationProfile = ({ orgProfile, ready, location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { organizationName, websiteLink, firstName, lastName, image, email, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about, _id } = data;
    const collectionName = OrganizationProfiles.getCollectionName();
    const updateData = { id: _id, organizationName, websiteLink, firstName, lastName, image, email, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));
    setRedirectToReferer(true);
  };
  /* Display the signup form. Redirect my profile page . */
  const { from } = location.state || { from: { pathname: '/my-organization-profile' } };
  // if correct authentication, redirect to from: page instead of edit screen
  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  return (ready) ? (
    <Container id={PAGE_IDS.EDIT_MY_ORGANIZATION_PROFILE}>
      <div className="organization-sign-up-top">
        <Header as="h2" textAlign="center" inverted>
          Edit My Organization Profile
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
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={orgProfile}>
              <Segment stacked basic>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                      Primary Information
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <TextField label='Organization Name' name='organizationName'/>
                    <ImageUploadFiled label='My Organization Image' name='image'/>
                    <TextField label='Website' name='websiteLink'/>
                  </Card.Content>
                  <Card.Content>
                    <TextField label='First Name' name='firstName'/>
                    <TextField label='Last Name' name='lastName'/>
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
                    <TextField label='Primary Address' name='primaryAddress'/>
                    <TextField label='City' name='city'/>
                    <TextField label='State' name='state'/>
                    <TextField label='ZipCode' name='zipCode'/>
                    <TextField label='Phone Number' name='phoneNumber'/>
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
                    <MultiSelectField label='Fields' name='fields'/>
                    <RadioField label='Environmental' name='environmental'/>
                    <LongTextField label='Description' name='about'/>
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
EditMyOrganizationProfile.propTypes = {
  orgProfile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  const subscription = OrganizationProfiles.subscribe();
  const ready = subscription.ready();
  const orgProfile = ready ? OrganizationProfiles.findDoc({ username: currentUser }) : undefined;
  return {
    orgProfile,
    ready,
  };
})(EditMyOrganizationProfile);
