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

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allOpportunities) => new SimpleSchema({
  opportunities: { type: Array, label: 'Opportunities', optional: true },
  'opportunities.$': { type: String, allowedValues: allOpportunities },
});

/** Renders a table containing all the Opportunity documents. Use <OpportunityItemOrganization> to render each row. */
class ListOpportunityOrganization extends React.Component {

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
    const allOpportunities1 = _.pluck(Opportunities.find({}, {}).fetch(), 'title');
    const formSchema1 = makeSchema(allOpportunities1);
    const bridge1 = new SimpleSchema2Bridge(formSchema1);
    const opportunityList1 = Opportunities.find({ title: { $in: this.state.opportunities } }, {}).fetch();

    const allOpportunities2 = _.pluck(Opportunities.find({}, {}).fetch(), 'category');
    const formSchema2 = makeSchema(allOpportunities2);
    const bridge2 = new SimpleSchema2Bridge(formSchema2);
    const opportunityList2 = Opportunities.find({ category: { $in: this.state.opportunities } }, {}).fetch();

    const allOpportunities3 = _.pluck(Opportunities.find({}, {}).fetch(), 'ageGroup');
    const formSchema3 = makeSchema(allOpportunities3);
    const bridge3 = new SimpleSchema2Bridge(formSchema3);
    const opportunityList3 = Opportunities.find({ ageGroup: { $in: this.state.opportunities } }, {}).fetch();

    const allOpportunities4 = _.pluck(Opportunities.find({}, {}).fetch(), 'environment');
    const formSchema4 = makeSchema(allOpportunities4);
    const bridge4 = new SimpleSchema2Bridge(formSchema4);
    const opportunityList4 = Opportunities.find({ environment: { $in: this.state.opportunities } }, {}).fetch();

    const panes = [
      { menuItem: 'Title', render: () => <Tab.Pane>
        <AutoForm style={{ paddingBottom: '20px' }} schema={bridge1} onSubmit={data => this.submit(data)} >
          <MultiSelectField label='' id='opportunities' name='opportunities' showInlineError={true} placeholder={'Find by Title'}/>
          <SubmitField id='submit' value='Submit'/>
        </AutoForm>
        <Card.Group stackable itemsPerRow={1} centered>{opportunityList1.map((opportunities, index) => <OpportunityItemOrganization
          key={index}
          opportunity={opportunities}/>)}
        </Card.Group>
      </Tab.Pane> },
      { menuItem: 'Category', render: () => <Tab.Pane>
        <AutoForm style={{ paddingBottom: '20px' }} schema={bridge2} onSubmit={data => this.submit(data)} >
          <MultiSelectField label='' id='opportunities' name='opportunities' showInlineError={true} placeholder={'Find by Category'}/>
          <SubmitField id='submit' value='Submit'/>
        </AutoForm>
        <Card.Group stackable itemsPerRow={1} centered>{opportunityList2.map((opportunities, index) => <OpportunityItemOrganization
          key={index}
          opportunity={opportunities}/>)}
        </Card.Group>
      </Tab.Pane> },
      { menuItem: 'Age Group', render: () => <Tab.Pane>
        <AutoForm style={{ paddingBottom: '20px' }} schema={bridge3} onSubmit={data => this.submit(data)} >
          <MultiSelectField label='' id='opportunities' name='opportunities' showInlineError={true} placeholder={'Find by Age Group'}/>
          <SubmitField id='submit' value='Submit'/>
        </AutoForm>
        <Card.Group stackable itemsPerRow={1} centered>{opportunityList3.map((opportunities, index) => <OpportunityItemOrganization
          key={index}
          opportunity={opportunities}/>)}
        </Card.Group>
      </Tab.Pane> },
      { menuItem: 'Environment', render: () => <Tab.Pane>
        <AutoForm style={{ paddingBottom: '20px' }} schema={bridge4} onSubmit={data => this.submit(data)} >
          <MultiSelectField label='' id='opportunities' name='opportunities' showInlineError={true} placeholder={'Find by Environment'}/>
          <SubmitField id='submit' value='Submit'/>
        </AutoForm>
        <Card.Group stackable itemsPerRow={1} centered>{opportunityList4.map((opportunities, index) => <OpportunityItemOrganization
          key={index}
          opportunity={opportunities}/>)}
        </Card.Group>
      </Tab.Pane> },
    ];

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
              <div className="map">
                <iframe width="695" height="370" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-158.42234810348603%2C21.16792215058402%2C-157.6793976640329%2C21.7615698948541&amp;layer=mapnik"/>
              </div>
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
