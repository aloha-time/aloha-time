import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import MapInset from '../components/MapInset';

/** Renders a table containing all of the Opportunity documents. Use <OpportunityItem> to render each row. */
const ViewMap = ({ ready }) => ((ready) ? (
  <Container id={PAGE_IDS.VIEW_MAP}>
    <div className="organization-sign-up-top">
      <Header as="h2" textAlign="center" inverted>
        Map
      </Header>
      <Header as="h5" textAlign="center" inverted>
        View a map of all available opportunities
      </Header>
    </div>
    <br/>
    <br/>
    <br/>
    <MapInset/>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Opportunity documents in the props.
ViewMap.propTypes = {
  opportunities: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Opportunity documents and sort them by name.
  const opportunities = Opportunities.find({}, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(ViewMap);
