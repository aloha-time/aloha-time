import React from 'react';
import { Container, Loader, Button, Header, Image, Grid, List, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';

const headerStyle = { padding: '1em' };
const columnStyle = { paddingTop: '9em' };
const margSides = { marginLeft: '4em', marginRight: '4em' };

/** Renders the page for volunteer profile document. */
const ShowVolunteerProfile = ({ volProfile, ready }) => ((ready) ? (
  <Container fluid id={PAGE_IDS.MY_PROFILE}>
    <div className="my-organization-top">
      <Image size='medium' src="/images/VAlogo.png" centered/>
    </div>
    <Grid style={headerStyle}>
      <Grid.Column width={3}>
        <Image centered size='small' src='https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' />
      </Grid.Column>
      <Grid.Column verticalAlign='middle' width={9} style={columnStyle}>
        <Header as='h1'>
          {volProfile.firstName} {volProfile.lastName}
        </Header>
        <p>Gender: {volProfile.genderType}</p>
        <p>Date of Birth: {volProfile.dateOfBirth}</p>
      </Grid.Column>
      <Grid.Column verticalAlign='middle' width={4} style={columnStyle}>
        <Segment>
          <Header as='h1' textAlign='center'>
            Hours volunteered
          </Header>
          <Header as='h2' textAlign='center'>
            20 hours
          </Header>
        </Segment>
      </Grid.Column>
    </Grid>
    <Segment.Group horizontal style={margSides}>
      <Segment padded='very'>
        <Header as='h3'> Personal Information </Header>
        <List relaxed>
          <List.Item>
            <List.Icon name='location arrow' />
            <List.Content>{volProfile.address} {volProfile.state} {volProfile.city} {volProfile.zip}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='phone' />
            <List.Content> {volProfile.phone} </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='mail' />
            <List.Content> {volProfile.email} </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='clock outline' />
            <List.Content> Availability: {volProfile.preferencesType}</List.Content>
          </List.Item>
        </List>
      </Segment>
      <Segment padded='very'>
        <Header as='h3'> Other Information </Header>
        <List bulleted relaxed>
          <List.Item>
            <List.Content> Environmental Preference: {volProfile.preferencesType}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content> Interests:  </List.Content>
            <List bulleted items={volProfile.interestsType}/>
          </List.Item>
          <List.Item>
            <List.Content> Skills:  </List.Content>
            <List bulleted items={volProfile.skillsType}/>
          </List.Item>
        </List>
      </Segment>
    </Segment.Group>
    <div className="my-organization-bottom" >
      <Button inverted size= "big" color="blue"><Link to="/edit-my-profile">Edit My Profile</Link></Button>
    </div>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require the organization profile documents in the props.
ShowVolunteerProfile.propTypes = {
  volProfile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  const subscription = VolunteerProfiles.subscribe();
  const ready = subscription.ready();
  const volProfile = ready ? VolunteerProfiles.findDoc({ username: currentUser }) : undefined;
  return {
    volProfile,
    ready,
  };
})(ShowVolunteerProfile);
