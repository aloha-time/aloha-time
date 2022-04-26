import React from 'react';
import { Container, Header, Loader, Button, Grid, Card, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityItemOrganization from '../components/OpportunityItemOrganization';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';
import MapInset from '../components/MapInset';

/** Renders a table containing all of the Opportunity documents. Use <OpportunityItemOrganization> to render each row. */
const ListOpportunityOrganization = ({ ready, opportunities }) => {
  const panes = [
    // eslint-disable-next-line react/display-name
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ];

  return ((ready) ? (
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
              <Tab panes={panes} />
            </Header>
          </Grid.Column>
          <Grid.Column width={10}>
            <MapInset/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br/>
      <Card.Group stackable itemsPerRow={3} centered>
        {opportunities.map((opportunity) => <OpportunityItemOrganization key={opportunity._id} opportunity={opportunity}/>)}
      </Card.Group>
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
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
        </Grid>)
        : ''}
      <br/>
    </Container>
  ) : <Loader active>Getting data</Loader>);
};

// Require an array of Opportunity documents in the props.
ListOpportunityOrganization.propTypes = {
  opportunities: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunityOrganization();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Opportunity documents and sort them by name.
  const opportunities = Opportunities.find({}, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(ListOpportunityOrganization);
