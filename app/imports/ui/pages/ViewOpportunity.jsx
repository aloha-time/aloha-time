import React from 'react';
import { Container, Header, Loader, Card, Grid, Button, Icon, Segment, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';

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
        <Card fluid>
          <img src={this.props.opportunity.coverImage} height={500} alt="cover image"/>
        </Card>
        <br/>
        <Grid columns={3}>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment size='massive' textAlign='center'>
                <h1>{this.props.opportunity.title}</h1>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment size='medium' textAlign='center'>
                <p>
                  <h3>
                    <Icon name='calendar alternate'/>
                    {this.props.opportunity.startDate} - {this.props.opportunity.endDate}
                  </h3>
                </p>
                <p>
                  <h3>
                    <Icon name='clock'/>
                    {this.props.opportunity.startTime} - {this.props.opportunity.endTime}
                  </h3>
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment size='small' textAlign='center'>
                <h4>
                  <p>
                    <Icon name='user'/>
                    {this.props.opportunity.contactName} - {this.props.opportunity.contactPosition}
                  </p>
                  <p>
                    <Icon name='mail'/>
                    {this.props.opportunity.email} | <Icon name='phone'/>
                    {this.props.opportunity.phone}
                  </p>
                </h4>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/>
        <br/>
        <Grid centered column>
          <Button color='blue'>
            <Icon name='map marker alternate'/> Get directions
          </Button>
          <Button color='blue'>
            <Icon name='heart'/> Bookmark
          </Button>
          <Button color='blue'>
            <Icon name='share alternate'/> Share
          </Button>
          <Button color='blue'>
            <Icon name='mail'/> Send an email
          </Button>
          <Button color='blue'>
            <Icon name='chat'/> Direct message
          </Button>
          <Button color='blue'>
            <Icon name='exclamation circle'/> Report
          </Button>
        </Grid>
        <br/>
        <br/>
        <Grid columns={2} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>
                <Icon name='map marker alternate'/> Location
                <p><h3>{this.props.opportunity.location}</h3></p>
              </Segment>
              <Segment>
                <Icon name='content'/> Description
                <p><h3>{this.props.opportunity.description}</h3></p>
              </Segment>
              <Segment>
                <Icon name='tree'/> Environment
                <p><h3>{this.props.opportunity.environment}</h3></p>
              </Segment>
              <Segment>
                <Icon name='block layout'/> Other Details
                <p><h3>{this.props.opportunity.ageGroup}</h3></p>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Icon name='ellipsis horizontal'/> Opportunity Type
                <p><h3>{this.props.opportunity.opportunityType}</h3></p>
              </Segment>
              <Segment>
                <Icon name='block layout'/> Category
                <p><h3>{this.props.opportunity.category}</h3></p>
              </Segment>
              <Segment>
                <Icon name='globe'/> Website
                <p><h3>{this.props.opportunity.website}</h3></p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/>
        <Card.Group stackable itemsPerRow={4}>
          <Card link>
            <Image src={this.props.opportunity.galleryImage}/>
          </Card>
          <Card link>
            <Image src={this.props.opportunity.galleryImage}/>
          </Card>
          <Card link>
            <Image src={this.props.opportunity.galleryImage}/>
          </Card>
          <Card link>
            <Image src={this.props.opportunity.galleryImage}/>
          </Card>
        </Card.Group>
        <Grid columns={3}>
          <Grid.Row/>
          <Grid.Row>
            <Grid.Column/>
            <Grid.Column>
              <Button animated='vertical' fluid color='blue' as={NavLink} exact to="/browse-opportunities">
                <Button.Content hidden>
                  View all opportunities
                </Button.Content>
                <Button.Content visible>
                  Want to volunteer for more?
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