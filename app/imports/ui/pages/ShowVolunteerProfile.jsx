import React from 'react';
import { Container, Grid, List, Loader, Image, Card, Icon, Button, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';

/** Renders the page for volunteer profile document. */
const ShowVolunteerProfile = ({ volProfile, ready }) => ((ready) ? (
  <Container id={PAGE_IDS.MY_PROFILE}>
    <Segment color='yellow'>
      <div className="my-organization-top">
        <Image size='medium' src="/images/VAlogo.png" centered/>
      </div>
      <Grid className="my-organization-medium">
        <Grid.Row>
          <Image size='small' padding-left ='20px' src="/images/volunteerAllyIcon.svg"/>
        </Grid.Row>
      </Grid>
      <div className="my-organization-title">
        <p>My Profile</p>
      </div>
      <Grid columns={2}>
        <Grid.Column>
          <Card.Group>
            <Card fluid color='red'>
              <Card.Content>
                <Card.Header><Icon color="yellow" name="paper plane outline"/>Primary Information</Card.Header>
              </Card.Content>
              <Card.Content>
                <List divided relaxed>
                  <List.Item>
                    <List.Icon color= "yellow" name='user circle' size='large' />
                    <List.Content>
                      <List.Header as='a'>Primary Contact First Name</List.Header>
                      <List.Description as='a'>{volProfile.firstName}</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon color= "yellow"name='user' size='large'/>
                    <List.Content>
                      <List.Header as='a'>Primary Contact Last Name</List.Header>
                      <List.Description as='a'>{volProfile.lastName}</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon color= "yellow"name='user' size='large'/>
                    <List.Content>
                      <List.Header as='a'>Gender</List.Header>
                      <List.Description as='a'>{volProfile.genderType}</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon color= "yellow" name='birthday' size='large'/>
                    <List.Content>
                      <List.Header as='a'>Date of Birth</List.Header>
                      <List.Description as='a'>{volProfile.dateOfBirth}</List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Content>
            </Card>
            <Card fluid color='yellow'>
              <Card.Content>
                <Card.Header><Icon color="yellow" name="mail"/>Primary Contact E-mail Address</Card.Header>
              </Card.Content>
              <Card.Content>
                <Card.Description>{volProfile.email}</Card.Description>
              </Card.Content>
            </Card>
            <Card fluid color='yellow'>
              <Card.Content>
                <Card.Header><Icon color="yellow" name="phone"/>Primary Contact Phone Number</Card.Header>
              </Card.Content>
              <Card.Content>
                <Card.Description>{volProfile.phone}</Card.Description>
              </Card.Content>
            </Card>
            <Card fluid color='orange'>
              <Card.Content>
                <Card.Header><Icon color="yellow" name="map signs"/>Primary Address</Card.Header>
              </Card.Content>
              <Card.Content>
                <Card.Description>{volProfile.address} {volProfile.state} {volProfile.city} {volProfile.zip}</Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
        <Grid.Column>
          <Card fluid color='yellow'>
            <Card.Content>
              <Card.Header><Icon color="yellow" name="star outline"/>Environmental (Indoor, Outdoor)</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>{volProfile.preferencesType}</Card.Description>
            </Card.Content>
          </Card>
          <Card fluid color='yellow'>
            <Card.Content>
              <Card.Header><Icon color="yellow" name="list ul"/>Interests </Card.Header>
            </Card.Content>
            <Card.Content>
              <List bulleted size="large" items={volProfile.interestsType}/>
            </Card.Content>
          </Card>
          <Card fluid color='yellow'>
            <Card.Content>
              <Card.Header><Icon color="yellow" name="list ul"/>Skills</Card.Header>
            </Card.Content>
            <Card.Content>
              <List bulleted size="large" items={volProfile.skillsType}/>
            </Card.Content>
          </Card>
          <Card fluid color='yellow'>
            <Card.Content>
              <Card.Header><Icon color="yellow" name="star outline"/>Availability</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>{volProfile.availabilityType}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
      <div className="my-organization-bottom" >
        <Button inverted size= "big" color="blue"><Link to="/edit-my-profile">Edit My Profile</Link></Button>
      </div>
    </Segment>
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
