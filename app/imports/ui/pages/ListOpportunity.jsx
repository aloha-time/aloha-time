import React from 'react';
import { Container, Header, Loader, Card, Grid, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityItem from '../components/OpportunityItem';
import { PAGE_IDS } from '../utilities/PageIDs';
// import TheMap from '../components/TheMap';

/** Renders a table containing all the Opportunity documents. Use <OpportunityItem> to render each row. */
class ListOpportunity extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container id={PAGE_IDS.LIST_OPPORTUNITY}>
        <div className="organization-sign-up-top">
          <Header as="h2" textAlign="center" inverted>
            Browse Opportunities
          </Header>
          <Header as="h5" textAlign="center" inverted>
            Volunteer for upcoming or existing events
          </Header>
        </div>
        <br/>
        <div className="map">
          <iframe width="725" height="350" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-158.42234810348603%2C21.16792215058402%2C-157.6793976640329%2C21.7615698948541&amp;layer=mapnik"/>
        </div>
        <br/>
        <Card.Group stackable itemsPerRow={3} centered>{this.props.opportunities.map((opportunities, index) => <OpportunityItem
          key={index}
          opportunity={opportunities}/>)}
        </Card.Group>
        <Grid columns={3}>
          <Grid.Row/>
          <Grid.Row>
            <Grid.Column/>
            <Grid.Column>
              <Button animated='vertical' fluid color='blue' as={NavLink} exact to="/add-opportunity">
                <Button.Content hidden>
                  Add a new opportunity
                </Button.Content>
                <Button.Content visible>
                  Are you an organization?
                </Button.Content>
              </Button>
            </Grid.Column>
            <Grid.Column/>
          </Grid.Row>
          <Grid.Row/>
        </Grid>
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
