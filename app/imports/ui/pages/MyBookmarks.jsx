import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card, Grid, Button, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityItemOrganization from '../components/OpportunityItemOrganization';
import { PAGE_IDS } from '../utilities/PageIDs';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { ROLE } from '../../api/role/Role';
import MapInset from '../components/MapInset';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allOpportunities) => new SimpleSchema({
  opportunities: { type: Array, label: 'Opportunities', optional: true },
  'opportunities.$': { type: String, allowedValues: allOpportunities },
});

/** Renders a table containing all the Opportunity documents. Use <OpportunityItemOrganization> to render each row. */
class MyBookmarks extends React.Component {

  constructor(props) {
    super(props);
    this.state = { opportunities: [] };
  }

  submit(data) {
    this.setState({ opportunities: data.opportunities || [] });
  }

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
              My Opportunities
            </Header>
            <Header as="h5" textAlign="center" inverted>
              Your organization&apos;s active opportunities
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
                <Tab panes={panes} />
              </Grid.Column>
              <Grid.Column width={10}>
                <MapInset/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br/>
          <Card.Group stackable itemsPerRow={3} centered>{this.props.opportunities.map((opportunities, index) => <OpportunityItemOrganization
              key={index}
              opportunity={opportunities}/>)}
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
    );
  }
}

// Require an array of Opportunity documents in the props.
MyBookmarks.propTypes = {
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
})(MyBookmarks);
