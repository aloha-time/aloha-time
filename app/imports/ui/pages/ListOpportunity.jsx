import React from 'react';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityCard from '../components/OpportunityCard';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Renders a table containing all the Opportunity documents. Use <OpportunityCard> to render each row. */
class ListOpportunity extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container id={PAGE_IDS.LIST_STUFF}>
        <Header as="h2" textAlign="center">Browse Opportunities</Header>
        <Card.Group centered>{this.props.opportunities.map((opportunities, index) => <OpportunityCard
          key={index}
          opportunity={opportunities}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Opportunity documents in the props.
ListOpportunity.propTypes = {
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
})(ListOpportunity);
