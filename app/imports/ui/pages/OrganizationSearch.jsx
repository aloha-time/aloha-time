import React from 'react';
import { CardGroup, Container, Header, Input, Loader, Checkbox, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import { OpportunityComponent } from '../components/OpportunityComponent';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class OrganizationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentOpportunities: [] };
  }

  filterOpportunities(opportunityTarget, allOpportunities) {
    if (opportunityTarget === '') {
      this.setState(() => ({ currentOpportunities: allOpportunities }));
      return;
    }
    this.setState(() => {
      let filteredOpportunities = allOpportunities.filter((opportunities) => {
        const searchLength = opportunities.length;
        return opportunities.name.substr(0, searchLength).toLowerCase() === opportunities.toLowerCase();
      });
      if (filteredOpportunities === []) {
        filteredOpportunities = this.props.opportunities;
      }
      return { currentOpportunities: filteredOpportunities };
    });
  }

  filterByAccepting(opportunities) {

    this.setState(() => {
      let filteredOpportunities = opportunities.filter();
      if (filteredOpportunities === []) {
        filteredOpportunities = this.props.opportunities;
      }
      return { currentOpportunities: filteredOpportunities };
    });

  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let renderOpportunities = [];
    if (this.state.currentOpportunities.length === 0) {
      renderOpportunities = this.props.opportunities;
    } else {
      renderOpportunities = this.state.currentOpportunities;
    }
    return (
      <Container id='opportunities-page'>
        <Header as="h2" textAlign="center">Volunteer Opportunities</Header>
        <Input id='search-opportunities' placeholder='' size='big' label='Search' onChange={(opportunities) => this.filterOpportunities(opportunities.target.value, this.props.opportunities)}/>
        <Grid container columns={4} padded centered>
          <Grid.Column>
            <Checkbox id='filter-by-accepting' label='Accepting new volunteers' /* onClick={() => this.filterByAccepting(this.props.opportunities)} *//>
          </Grid.Column>
          <Grid.Column>
            <Checkbox id='work-with-people' label='Work with people' /* onClick={() => this.filterByAccepting(this.props.opportunities)} *//>
          </Grid.Column>
          <Grid.Column>
            <Checkbox id='work-with-animals' label='Work with animals' /* onClick={() => this.filterByAccepting(this.props.opportunities)} *//>
          </Grid.Column>
        </Grid>
        <Grid container columns={5} padded centered>
          <Grid.Column>
            <Checkbox id='location-honolulu' label='Honolulu' /* onClick={() => this.filterByAccepting(this.props.opportunities)} *//>
          </Grid.Column>
          <Grid.Column>
            <Checkbox id='location-kailua-kaneohe' label='Windward' /* onClick={() => this.filterByAccepting(this.props.opportunities)} *//>
          </Grid.Column>
          <Grid.Column>
            <Checkbox id='location-north-shore' label='North Shore' /* onClick={() => this.filterByAccepting(this.props.opportunities)} *//>
          </Grid.Column>
          <Grid.Column>
            <Checkbox id='location-central-oahu' label='Central Oahu' /* onClick={() => this.filterByAccepting(this.props.opportunities)} *//>
          </Grid.Column>
          <Grid.Column>
            <Checkbox id='location-leeward' label='Leeward' /* onClick={() => this.filterByAccepting(this.props.opportunities)} *//>
          </Grid.Column>
        </Grid>
        <CardGroup centered>
          {renderOpportunities.map((surfBreak, index) => <OpportunityComponent surfBreakPage={this} id={`surfBreak${index}`} key={index} surfBreak={surfBreak} currentUser={'johnfoo'}/>)}
        </CardGroup>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
OrganizationSearch.propTypes = {
  opportunities: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  // const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = true;
  // Get the Stuff documents
  const opportunities = Opportunities.find({}).fetch();
  return {
    opportunities,
    ready,
  };
})(OrganizationSearch);
