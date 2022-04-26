import React from 'react';
import { Container, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import OrgItem from '../components/OrgItem';
import { PAGE_IDS } from '../utilities/PageIDs';

const pageStyle = { paddingTop: '15px', paddingBottom: '15px' };

/** Renders a table containing all of the Organizations. Use <OrgItem> to render each row. */
const ListOrg = ({ ready, orgs }) => ((ready) ? (
  <Container id={PAGE_IDS.LANDING} style={ pageStyle }>
    <Card.Group itemsPerRow={4} style={ pageStyle } centered> {/* will eventually be a single OrgItem, something along the lines of {orgs.map((org) => <OrgItem key={org._id} org={org} />)} */}
      {orgs.map((org) => <OrgItem key={org._id} org={org} />)}
    </Card.Group>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
ListOrg.propTypes = {
  orgs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to OrganizationProfiles documents.
  const subscription = OrganizationProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the OrganizationProfiles documents and sort them by name.
  const orgs = OrganizationProfiles.find({}, { sort: { organizationName: 1 } }).fetch();
  return {
    orgs,
    ready,
  };
})(ListOrg);
