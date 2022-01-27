import React from 'react';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/Profiles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { mockProfiles } from '../../api/MockProfiles';
import VolunteerProfile from '../components/VolunteerProfile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ShowVolunteerProfile = ({ ready }) => ((ready) ? (
  <Container id={PAGE_IDS.LIST_STUFF}>
    <Header as="h2" textAlign="center">Volunteer Profile</Header>
    <Header as="h3" textAlign="center">profiles.name</Header>

    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Events</Table.HeaderCell>
          <Table.HeaderCell>Edit</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {mockProfiles.map((profile) => <VolunteerProfile key={profile._id} profile={profile.event} />)}
      </Table.Body>
    </Table>
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
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Profile documents and sort them by name.
  const profiles = Profiles.collection.find({}, { sort: { name: 1 } }).fetch();
  return {
    profiles,
    ready,
  };
})(ShowVolunteerProfile);
