import React from 'react';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
// import OpportunityItemOrganization from '../components/OpportunityItemOrganization';
import { PAGE_IDS } from '../utilities/PageIDs';
import OpportunityItem from '../components/OpportunityItem';
// import { ROLE } from '../../api/role/Role';

/** Renders a table containing all of the Opportunity documents. Use <OpportunityItemOrganization> to render each row. */
const MyBookmarks = ({ ready, opportunities }) => ((ready) ? (
  <Container id={PAGE_IDS.MY_BOOKMARKS} fluid>
    <div className="organization-sign-up-top">
      <Header as="h2" textAlign="center" inverted>
            My Bookmarks
      </Header>
      <Header as="h5" textAlign="center" inverted>
            Your active bookmarks
      </Header>
    </div>
    <br/>
    <br/>
    <Card.Group stackable itemsPerRow={3} centered>
      {opportunities.map((opportunity) => <OpportunityItem key={opportunity._id} opportunity={opportunity}/>)}
    </Card.Group>
    <br/>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Opportunity documents in the props.
MyBookmarks.propTypes = {
  opportunities: PropTypes.array.isRequired,
  // bookmarks: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Opportunity documents and sort them by name.
  const opportunities = Opportunities.find({ bookmarks: { $gt: 0 } }, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(MyBookmarks);
