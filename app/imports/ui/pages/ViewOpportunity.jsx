import React from 'react';
import { Container, Header, Loader, Card, Grid, Button, Icon, Segment, List, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
// import { VolunteerBookmarks } from '../../api/bookmarks/VolunteerBookmarkCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';
import { MyUrl } from '../components/MyUrl';
import MapInset from '../components/MapInset';
import BookmarkButton from '../components/BookmarkButton';

/** Renders a table containing all the Opportunity documents. Use <OpportunityItem> to render each row. */
const ViewOpportunity = ({ opportunity, ready, currentUser }) => {
  const openNewTab = () => {
    const link = `https://www.google.com/maps/place/${opportunity.location}`;
    // eslint-disable-next-line no-undef
    window.open(link);
  };

  console.log(opportunity);
  // console.log(bookmarks);
  console.log(currentUser);

  /** Render the page once subscriptions have been received. */
  return (ready) ? (
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
            exact to={`/opportunity-hours/${opportunity._id}`}>
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
        <img src={MyUrl(opportunity.coverImage)} height={500} alt="cover image"/>
      </Card>
      <br/>
      <Grid columns={3}>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment size='massive' textAlign='center'>
              <h1>{opportunity.title}</h1>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment size='small' textAlign='center'>
              <p>
                <Icon name='calendar alternate'/>
                {opportunity.startDate.toLocaleDateString('en-US')} - {opportunity.endDate.toLocaleDateString('en-US')}
              </p>
              <p>
                <Icon name='clock'/>
                {opportunity.startDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')} - {opportunity.endDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')}
              </p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment size='small' textAlign='center'>
              <h4>
                <p>
                  <Icon name='user'/>
                  {opportunity.contactName} - {opportunity.contactPosition}
                </p>
                <p>
                  <Icon name='mail'/>
                  {opportunity.email} | <Icon name='phone'/>
                  {opportunity.phone}
                </p>
              </h4>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br/>
      <br/>
      <Grid centered>
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
          <h1>
            <Icon name='user'/>
            {opportunity.owner}
          </h1>)
          : ''}
        {!Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION, ROLE.ADMIN]) ? (
          <div>
            <Button color='blue' onClick={openNewTab}>
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
            <BookmarkButton opportunity={opportunity} username={currentUser} />
            <Button color='blue'>
              <Icon name='exclamation circle'/> Report
            </Button>
          </div>)
          : ''}
        {currentUser === opportunity.owner && Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
          <div>
            <Button color='blue' as={NavLink} exact to={`/edit-opportunity/${opportunity._id}`}>
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
              <h3>{opportunity.opportunityType}</h3>
            </Segment>
            <Segment>
              <Icon name='content'/> Description
              <h3>{opportunity.description}</h3>
            </Segment>
            <Segment>
              <Icon name='tree'/> Environment
              <h3>
                <List bulleted relaxed items={opportunity.environment}/>
              </h3>
            </Segment>
            <Segment>
              <Icon name='block layout'/> Other Details
              <h3>
                <List bulleted relaxed items={opportunity.ageGroup}/>
              </h3>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Icon name='map marker alternate'/> Location
              <h3>{opportunity.location}</h3>
              <Divider/>
              <Grid container fluid>
                <MapInset/>
              </Grid>
            </Segment>
            <Segment>
              <Icon name='block layout'/> Category
              <h3>
                <List bulleted relaxed items={opportunity.category}/>
              </h3>
            </Segment>
            <Segment>
              <Icon name='globe'/> Website
              <h3>{opportunity.website}</h3>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br/>
      <Card.Group stackable itemsPerRow={4}>
        <Card link>
          <img src={MyUrl(opportunity.galleryImg1)} height="200" alt="galleryimg1"/>
        </Card>
        <Card link>
          <img src={MyUrl(opportunity.galleryImg2)} height="200" alt="galleryimg2"/>
        </Card>
        <Card link>
          <img src={MyUrl(opportunity.galleryImg3)} height="200" alt="galleryimg3"/>
        </Card>
        <Card link>
          <img src={MyUrl(opportunity.galleryImg4)} height="200" alt="galleryimg4"/>
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
  ) : <Loader active>Getting data</Loader>;
};

// Require an array of Opportunity documents in the props.
ViewOpportunity.propTypes = {
  opportunity: PropTypes.object.isRequired,
  // bookmarks: PropTypes.array,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const opportunityId = _id;
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // const subscription2 = VolunteerBookmarks.subscribeVolunteerBookmark();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Opportunity documents and sort them by name.
  const opportunity = Opportunities.getOpportunity(opportunityId);
  // const bookmarks = VolunteerBookmarks.getVolunteerBookmark(currentUser);
  return {
    opportunity,
    // bookmarks,
    ready,
    currentUser,
  };
})(ViewOpportunity);
