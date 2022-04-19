import React, { useState } from 'react';
import { Grid, Loader, Header, Container } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import {
  AutoForm,
} from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import UploadImages from '../components/UploadImages';

const bridge = new SimpleSchema2Bridge(OrganizationProfiles._schema);

/** Renders the Page for editing a single document. */
const EditMyOrganizationProfileImages = ({ orgProfile, ready, location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { galleryImg1, galleryImg2, galleryImg3,
      galleryImg4, galleryImg5, galleryImg6, _id } = data;
    const collectionName = OrganizationProfiles.getCollectionName();
    const updateData = { id: _id, galleryImg1, galleryImg2, galleryImg3,
      galleryImg4, galleryImg5, galleryImg6 };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'images updated successfully', 'success'));
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
          Update Your images
        </Header>
        <Header as="h5" textAlign="center" inverted>
         Good memories
        </Header>
      </div>
      <br/>
      <br/>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <div className="orgnization-signup-form">
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={orgProfile}>
              <UploadImages/>
            </AutoForm>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

// Require the presence of a Opportunity document in the props object. Uniforms adds 'model' to the props, which we use.
EditMyOrganizationProfileImages.propTypes = {
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
})(EditMyOrganizationProfileImages);
