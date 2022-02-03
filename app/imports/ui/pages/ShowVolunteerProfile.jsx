import React from 'react';
import { Container, Grid, Header, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Profiles } from '../../api/Profiles';
// import { Users } from '../../api/user/UserCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
// import { mockProfiles } from '../../api/MockProfiles';
// import VolunteerProfile from '../components/VolunteerProfile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ShowVolunteerProfile = ({ ready }) => ((ready) ? (
  <Container id={PAGE_IDS.SHOW_VOLUNTEER_PROFILE}>
    <Header as="h2" textAlign="center">Volunteer Profile</Header>
    <Header as="h3" textAlign="center">John Foo{/* this.props.profiles.name */}</Header>

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
        </Grid.Column>
        <Grid.Column>
          <Image src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fd.ibtimes.co.uk%2Fen%2Ffull%2F1509402%2Flaughing-humans.jpg&f=1&nofb=1'/>
        </Grid.Column>
        <Grid.Column>
          <Header as='h3'>3 Hours</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns='equal'>
        <Grid.Column>
          <Header as='h3'>Friendlier event</Header>
        </Grid.Column>
        <Grid.Column>
          <Image src='https://bestlifeonline.com/wp-content/uploads/sites/3/2018/07/young-people-laughing-in-europe.jpg?quality=82&strip=1&resize=640%2C360'/>
        </Grid.Column>
        <Grid.Column>
          <Header as='h3'>5 Hours</Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
ShowVolunteerProfile.propTypes = {
  stuffs: PropTypes.array,
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
