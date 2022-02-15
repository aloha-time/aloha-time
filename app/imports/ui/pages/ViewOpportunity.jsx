import React from 'react';
import { Container, Header, Loader, Card, Grid, Button, Image, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a table containing all the Opportunity documents. Use <OpportunityItem> to render each row. */
class ViewOpportunity extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container id={PAGE_IDS.VIEW_OPPORTUNITY}>
        <div className="organization-sign-up-top">
          <Header as="h2" textAlign="center" inverted>
            Opportunity Details
          </Header>
          <Header as="h5" textAlign="center" inverted>
            Information about this listing
          </Header>
        </div>
        <br/>
        <br/>
        <Card link>
          <Image large src={this.props.opportunity.coverImage} wrapped ui={false} />
          <Card.Content>
            <Card.Header>
              <h1>{this.props.opportunity.title}</h1>
            </Card.Header>
            <Card.Meta>
              <Icon name='calendar alternate'/>
              {this.props.opportunity.startDate} - {this.props.opportunity.endDate}
            </Card.Meta>
            <Card.Meta>
              <Icon name='clock'/>
              {this.props.opportunity.startTime} - {this.props.opportunity.endTime}</Card.Meta>
            <Card.Meta>
              <Icon name='map marker alternate'/>
              {this.props.opportunity.location}
            </Card.Meta>
            <Card.Meta>Category: {this.props.opportunity.category}</Card.Meta>
            <Card.Meta>Description: {this.props.opportunity.description}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Link className={COMPONENT_IDS.LIST_OPPORTUNITY_EDIT} to={`/edit-opportunity/${this.props.opportunity._id}`}>Edit</Link>
          </Card.Content>
        </Card>
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
ViewOpportunity.propTypes = {
  opportunity: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const opportunityId = _id;
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Opportunity documents and sort them by name.
  const opportunity = Opportunities.findDoc(opportunityId);
  return {
    opportunity,
    ready,
  };
})(ViewOpportunity);
