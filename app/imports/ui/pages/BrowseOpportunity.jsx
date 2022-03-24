import React from 'react';
import { Container, Header, Loader, Button, Grid, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityCard from '../components/OpportunityCard';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Renders a table containing all of the Opportunity documents. Use <OpportunityCard> to render each row. */
const BrowseOpportunity = ({ ready, opportunities }) => ((ready) ? (
  <Container id={PAGE_IDS.BROWSE_OPPORTUNITIES}>
    <div className="organization-sign-up-top">
      <Header as="h2" textAlign="center" inverted>
        Browse Opportunities
      </Header>
      <Header as="h5" textAlign="center" inverted>
        Volunteer for upcoming or existing events
      </Header>
    </div>
    <br/>
    <Button floated='right' color='blue' as={NavLink}
      exact to="/calendar-schedule">
      View Calendar Schedule
    </Button>
    <br/>
    <br/>
    <br/>
    <Grid>
      <Grid.Row>
        <Grid.Column width={6}>
          <Header>
            TABS GO HERE
          </Header>
        </Grid.Column>
        <Grid.Column width={10}>
          <div className="map">
            <iframe width="695" height="370" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-158.42234810348603%2C21.16792215058402%2C-157.6793976640329%2C21.7615698948541&amp;layer=mapnik"/>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <br/>
    <Card.Group stackable itemsPerRow={3} centered>
      {opportunities.map((opportunity) => <OpportunityCard key={opportunity._id} opportunity={opportunity} />)}
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
              Do you have an upcoming event?
            </Button.Content>
          </Button>
        </Grid.Column>
        <Grid.Column/>
      </Grid.Row>
      <Grid.Row/>
    </Grid>
    <br/>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Opportunity documents in the props.
BrowseOpportunity.propTypes = {
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
})(BrowseOpportunity);
