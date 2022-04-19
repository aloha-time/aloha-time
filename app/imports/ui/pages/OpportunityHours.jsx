import React from 'react';
import { Container, Header, Loader, Card, Grid, Button, Segment, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { MyUrl } from '../components/MyUrl';

/** Renders a table containing all the Opportunity documents. Use <OpportunityItem> to render each row. */
class OpportunityHours extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container id={PAGE_IDS.OPPORTUNITY_HOURS}>
        <div className="organization-sign-up-top">
          <Header as="h2" textAlign="center" inverted>
            Submit Your Hours
          </Header>
          <Header as="h5" textAlign="center" inverted>
            Submit the total time you have volunteered for this opportunity
          </Header>
        </div>
        <Header as="h1" textAlign="center">
          Record Your Time
        </Header>
        <br/>
        <Grid columns={4} divided textAlign='center'>
          <Grid.Row>
            <Grid.Column>
              <Header>Date</Header>
              <input type="date" id="start" name="trip-start"
                value="2018-07-22"
                min="2018-01-01" max="2018-12-31" />
            </Grid.Column>
            <Grid.Column>
              <Header>Start Time</Header>
              <input type="time" id="appt" name="appt"
                min="09:00" max="18:00" required />
            </Grid.Column>
            <Grid.Column>
              <Header>End Time</Header>
              <input type="time" id="appt" name="appt"
                min="09:00" max="18:00" required />
            </Grid.Column>
            <Grid.Column>
              <Button type='submit' color='blue'>Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/>
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
        <Header as="h1" textAlign="center">
          Mahalo For Helping Out!
        </Header>
        <Grid>
          <Grid.Row/>
          <Grid.Row>
            <Grid.Column width={3}/>
            <Grid.Column width={5}>
              <Button animated='vertical' fluid color='blue' as={NavLink}
                exact to={`/view-opportunity/${this.props.opportunity._id}`}>
                <Button.Content hidden>
                  View Opportunity Details
                </Button.Content>
                <Button.Content visible>
                  Return To Listing
                </Button.Content>
              </Button>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button animated='vertical' fluid color='blue' as={NavLink} exact to="/browse-opportunities">
                <Button.Content hidden>
                  View all opportunities
                </Button.Content>
                <Button.Content visible>
                  Want to volunteer for more?
                </Button.Content>
              </Button>
            </Grid.Column>
            <Grid.Column width={3}/>
          </Grid.Row>
          <Grid.Row/>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Opportunity documents in the props.
OpportunityHours.propTypes = {
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
})(OpportunityHours);
