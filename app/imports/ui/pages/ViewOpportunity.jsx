import React from 'react';
import { Container, Header, Loader, Card, Grid, Button, Icon, Segment, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';
import { MyUrl } from '../components/MyUrl';
import MapInset from '../components/MapInset';

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
        {Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER]) ? (
          <div>
            <Button floated='right' animated='vertical' color='blue' as={NavLink}
              exact to={`/opportunity-hours/${this.props.opportunity._id}`}>
              <Button.Content hidden>
                <Icon name='hourglass half'/> Confirm Your Hours
              </Button.Content>
              <Button.Content visible>
                <Icon name='check circle'/>Did You Finish Volunteering?
              </Button.Content>
            </Button>
            <br/>
            <br/>
          </div>)
          : ''}
        <Card fluid>
          <img src={MyUrl(this.props.opportunity.coverImage)} height={500} alt="cover image"/>
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
                  <Icon name='calendar alternate'/>
                  {this.props.opportunity.startDate.toLocaleDateString('en-US')} - {this.props.opportunity.endDate.toLocaleDateString('en-US')}
                </p>
                <p>
                  <Icon name='clock'/>
                  {this.props.opportunity.startDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')} - {this.props.opportunity.endDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')}
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
          {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
            <h1>
              <Icon name='user'/>
              {this.props.opportunity.owner}
            </h1>)
            : ''}
          {!Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION, ROLE.ADMIN]) ? (
            <div>
              <Button color='blue'>
                <Icon name='map marker alternate'/> Get directions
              </Button>
              <Button color='blue'>
                <Icon name='share alternate'/> Share
              </Button>
              <Button color='blue'>
                <Icon name='mail'/> Send an email
              </Button>
            </div>)
            : ''}
          {Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER]) ? (
            <div>
              <Button color='blue'>
                <Icon name='chat'/> Direct message
              </Button>
              <Button color='blue'>
                <Icon name='heart'/> Bookmark
              </Button>
              <Button color='blue'>
                <Icon name='exclamation circle'/> Report
              </Button>
            </div>)
            : ''}
          {this.props.currentUser === this.props.opportunity.owner && Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
            <div>
              <Button color='blue' as={NavLink} exact to={`/edit-opportunity/${this.props.opportunity._id}`}>
                <Icon name='pencil alternate'/> Edit this opportunity
              </Button>
              <Button color='blue' as={NavLink} exact to="/add-opportunity">
                <Icon name='add circle'/> Add new opportunity
              </Button>
              <Button color='red'>
                <Icon name='trash alternate'/> Delete this opportunity
              </Button>
            </div>)
            : ''}
        </Grid>
        <br/>
        <br/>
        <Grid columns={2} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>
                <Icon name='ellipsis horizontal'/> Opportunity Type
                <p><h3>{this.props.opportunity.opportunityType}</h3></p>
              </Segment>
              <Segment>
                <Icon name='content'/> Description
                <p><h3>{this.props.opportunity.description}</h3></p>
              </Segment>
              <Segment>
                <Icon name='tree'/> Environment
                <h3>
                  <List bulleted relaxed items={this.props.opportunity.environment}/>
                </h3>
              </Segment>
              <Segment>
                <Icon name='block layout'/> Other Details
                <h3>
                  <List bulleted relaxed items={this.props.opportunity.ageGroup}/>
                </h3>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Icon name='map marker alternate'/> Location
                <p><h3>{this.props.opportunity.location}</h3></p>
                <MapInset/>
              </Segment>
              <Segment>
                <Icon name='block layout'/> Category
                <h3>
                  <List bulleted relaxed items={this.props.opportunity.category}/>
                </h3>
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
            <img src={MyUrl(this.props.opportunity.galleryImg1)} height="200" alt="galleryimg1"/>
          </Card>
          <Card link>
            <img src={MyUrl(this.props.opportunity.galleryImg2)} height="200" alt="galleryimg2"/>
          </Card>
          <Card link>
            <img src={MyUrl(this.props.opportunity.galleryImg3)} height="200" alt="galleryimg3"/>
          </Card>
          <Card link>
            <img src={MyUrl(this.props.opportunity.galleryImg4)} height="200" alt="galleryimg4"/>
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
                  Interested in something else?
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
  opportunity: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const opportunityId = _id;
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Opportunity documents and sort them by name.
  const opportunity = (ready) ? Opportunities.findDoc(opportunityId) : undefined;
  return {
    opportunity,
    ready,
    currentUser,
  };
})(ViewOpportunity);
