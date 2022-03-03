import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card, Grid, Button, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityItem from '../components/OpportunityItem';
import { PAGE_IDS } from '../utilities/PageIDs';
import MultiSelectField from '../components/form-fields/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allTitles, allCategories, allAges, allEnvironments) => new SimpleSchema({
  titles: { type: Array, label: 'Title', optional: true },
  'titles.$': { type: String, allowedValues: allTitles },
  categories: { type: Array, label: 'Category', optional: true },
  'categories.$': { type: String, allowedValues: allCategories },
  ages: { type: Array, label: 'Age Groups', optional: true },
  'ages.$': { type: String, allowedValues: allAges },
  environments: { type: Array, label: 'Environments', optional: true },
  'environments.$': { type: String, allowedValues: allEnvironments },
});

/** Renders a table containing all the Opportunity documents. Use <OpportunityItem> to render each row. */
class ListOpportunity extends React.Component {

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
    const allTitles = _.pluck(Opportunities.find({}, {}).fetch(), 'title');
    const allCategories = _.pluck(Opportunities.find({}, {}).fetch(), 'category');
    const allAges = _.pluck(Opportunities.find({}, {}).fetch(), 'ageGroup');
    const allEnvironments = _.pluck(Opportunities.find({}, {}).fetch(), 'environment');
    const formSchema = makeSchema(allTitles, allCategories, allAges, allEnvironments);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // const opportunityList = Opportunities.find({ title: { $in: this.state.opportunities } }, {}).fetch();
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
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <AutoForm style={{ paddingBottom: '20px' }} schema={bridge} onSubmit={data => this.submit(data)} >
                <Segment>
                  <MultiSelectField id='titles' name='titles' showInlineError={true} placeholder={'Find by Title'}/>
                  <MultiSelectField id='categories' name='categories' showInlineError={true} placeholder={'Pick a Category'}/>
                  <MultiSelectField id='ages' name='ages' showInlineError={true} placeholder={'Pick an Age Group'}/>
                  <MultiSelectField id='environments' name='environments' showInlineError={true} placeholder={'Pick an Environment'}/>
                  <SubmitField id='submit' value='Submit'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
            <Grid.Column width={11}>
              <div className="map">
                <iframe width="765" height="370" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-158.42234810348603%2C21.16792215058402%2C-157.6793976640329%2C21.7615698948541&amp;layer=mapnik"/>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
