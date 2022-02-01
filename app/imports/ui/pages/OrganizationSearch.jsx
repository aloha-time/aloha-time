import React from 'react';
import { CardGroup, Container, Header, Input, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Opportunities } from '../../api/OpportunitiesCollection';

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
      let filteredOpportunities = _.filter(allOpportunities, (opportunities) => {
        const searchLength = opportunities.length;
        return opportunities.name.substr(0, searchLength).toLowerCase() === opportunities.toLowerCase();
      });
      if (filteredOpportunities === []) {
        filteredOpportunities = this.props.Opportunities;
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
    if (this.state.currentSurfBreaks.length === 0) {
      renderOpportunities = this.props.Opportunities;
    } else {
      renderOpportunities = this.state.currentSurfBreaks;
    }
    return (
      <Container id='opportunities-page'>
        <Header as="h2" textAlign="center">Volunteer Opportunities</Header>
        <Input id='filter-breaks' placeholder='' size='big' label='Filter' onChange={(opportunities) => this.filterOpportunities(opportunities.target.value, this.props.Opportunities)}/>
        <CardGroup centered>
          {renderOpportunities.map((surfBreak, index) => <SurfBreak surfBreakPage={this} id={`surfBreak${index}`} key={index} surfBreak={surfBreak} currentUser={this.props.currentUser}/>)}
        </CardGroup>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
OrganizationSearch.propTypes = {
  Opportunities: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Opportunities.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const surfBreaks = Opportunities.collection.find({}).fetch();
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    surfBreaks,
    ready,
  };
})(OrganizationSearch);
