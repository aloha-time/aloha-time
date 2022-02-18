import React from 'react';
import { Container, Grid, Header, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';

const pageStyle = { paddingTop: '15px', paddingBottom: '15px' };

/** Renders a page containing all information for a single Volunteer. */
const ShowVolunteerProfile = ({ ready }) => ((ready) ? (
  <Container id={PAGE_IDS.SHOW_VOLUNTEER_PROFILE} style={pageStyle}>
    <Grid float='left' padded>
      <Grid.Row>
        <Image size='small' src="/images/johnfoo.jpeg"/>
      </Grid.Row>
      <Grid.Row>
        <Header as="h1" className="opportunities">John Foo{/* this.props.profiles.name */}</Header>
      </Grid.Row>
    </Grid>

    <Grid divided='vertically'>
      <Grid.Row columns='equal'>
        <Grid.Column>
          <Header as='h2'>Event Name</Header>
        </Grid.Column>
        <Grid.Column>
          <Header as='h2'>Pictures</Header>
        </Grid.Column>
        <Grid.Column>
          <Header as='h2'>Hours Volunteered</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns='equal'>
        <Grid.Column>
          <Header as='h3'>Friendly event</Header>
          <p>A friendly event where volunteers walked through a city volunteering.</p>
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/laughing.jpeg"/>
        </Grid.Column>
        <Grid.Column>
          <Header as='h3'>3 Hours</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns='equal'>
        <Grid.Column>
          <Header as='h3'>Friendlier event</Header>
          <p>An even friendlier event where volunteers threw a party for children and puppies.</p>
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/party.jpg'/>
        </Grid.Column>
        <Grid.Column>
          <Header as='h3'>5 Hours</Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  </Container>
) : <Loader active>Getting data</Loader>);

// Require a single Volunteer profile in the props.
ShowVolunteerProfile.propTypes = {
//  stuffs: PropTypes.array,
  profiles: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  // const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = true; // subscription.ready();
  // Get the Profile documents and sort them by name.
  // const profiles = Users.getProfile({}, { sort: { name: 1 } }).fetch();
  return {
    // profiles,
    ready,
  };
})(ShowVolunteerProfile);
