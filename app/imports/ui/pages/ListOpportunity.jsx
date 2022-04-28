import React, { useState } from 'react';
import { Container, Header, Loader, Button, Grid, Card, Tab, Accordion, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityItem from '../components/OpportunityItem';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';
import MapInset from '../components/MapInset';
import FilterByTitle from '../components/FilterByTitle';
import FilterByCategory from '../components/FilterByCategory';
import FilterByAge from '../components/FilterByAge';
import FilterByEnvironment from '../components/FilterByEnvironment';

/** Renders a table containing all of the Opportunity documents. Use <OpportunityItem> to render each row. */
const ListOpportunity = ({ ready, opportunities }) => {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    e.preventDefault();
    // console.log(titleProps);
    const newIndex = activeIndex === titleProps.index ? -1 : titleProps.index;
    setActiveIndex(newIndex);
  };

  const panes = [
    // eslint-disable-next-line react/display-name
    { menuItem: 'Title', render: () => <Tab.Pane><FilterByTitle/></Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Category', render: () => <Tab.Pane><FilterByCategory/></Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Age', render: () => <Tab.Pane><FilterByAge/></Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Environment', render: () => <Tab.Pane><FilterByEnvironment/></Tab.Pane> },
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
      <Grid centered columns={2}>
        <Grid.Row>
          <MapInset/>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              <h3>
                <Icon name='dropdown'/>
               Filter Results
              </h3>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Tab panes={panes} />
            </Accordion.Content>
          </Accordion>
        </Grid.Row>
      </Grid>
      <br/>
      <Card.Group stackable itemsPerRow={3} centered>
        {opportunities.map((opportunity) => <OpportunityItem key={opportunity._id} opportunity={opportunity}/>)}
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
  const opportunities = Opportunities.find({ verification: 'Verified' }, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(ListOpportunity);
