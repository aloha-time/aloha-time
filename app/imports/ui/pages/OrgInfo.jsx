import React from 'react';
import { Container, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import OrgItem2 from '../components/OrgItem2';

// const pageStyle = { paddingTop: '15px', paddingBottom: '15px' };

/** Renders a table containing all of the Organization documents. Use <OrgItem2> to render each row. */
const OrgInfo = ({ ready, doc }) => ((ready) ? (
  <Container fluid>
    <Grid columns='equal'>
      <Grid.Column>
        <OrgItem2 org={doc}/>
      </Grid.Column>
    </Grid>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Organization documents in the props.
OrgInfo.propTypes = {
  orgs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  doc: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const documentId = _id;
  // Get access to Organization Profiles.
  const subscription = OrganizationProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Organization Profiles and sort them by name.
  const orgs = OrganizationProfiles.find({}, { sort: { organizationName: 1 } }).fetch();
  // Get the document
  const doc = orgs.find((org) => org._id === documentId);
  return {
    orgs,
    ready,
    doc,
  };
})(OrgInfo);
