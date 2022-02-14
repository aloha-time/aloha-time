import React from 'react';
import { Container, Grid, List, Loader, Image, Card, Icon, Button, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const MyOrganizationProfile = ({ doc, ready }) => ((ready) ? (
  <Container id={PAGE_IDS.MY_ORGANIZATION_PROFILE}>
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
        <p>My organization profile</p>
      </div>
      <Grid columns={2}>
        <Grid.Column>
          <Card.Group>
            <Card fluid color='red'>
              <Card.Content>
                <Card.Header><Icon color="yellow" name="paper plane outline"/>Primary Contact Name</Card.Header>
              </Card.Content>
              <Card.Content>
                <List divided relaxed>
                  <List.Item>
                    <List.Icon color= "yellow" name='user circle' size='large' />
                    <List.Content>
                      <List.Header as='a'>Primary Contact First Name</List.Header>
                      <List.Description as='a'>{doc.firstName}</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon color= "yellow"name='user' size='large'/>
                    <List.Content>
                      <List.Header as='a'>Primary Contact Last Name</List.Header>
                      <List.Description as='a'>{doc.lastName}</List.Description>
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
                <Card.Description>{doc.email}</Card.Description>
              </Card.Content>
            </Card>
            <Card fluid color='yellow'>
              <Card.Content>
                <Card.Header><Icon color="yellow" name="phone"/>Primary Contact Phone Number</Card.Header>
              </Card.Content>
              <Card.Content>
                <Card.Description>{doc.phoneNumber}</Card.Description>
              </Card.Content>
            </Card>
            <Card fluid color='orange'>
              <Card.Content>
                <Card.Header><Icon color="yellow" name="map signs"/>Primary Address</Card.Header>
              </Card.Content>
              <Card.Content>
                <Card.Description>{doc.primaryAddress} {doc.state} {doc.city} {doc.zipCode}</Card.Description>
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
              <Card.Description>{doc.environmental}</Card.Description>
            </Card.Content>
          </Card>
          <Card fluid color='yellow'>
            <Card.Content>
              <Card.Header><Icon color="yellow" name="list ul"/>Fields </Card.Header>
            </Card.Content>
            <Card.Content>
              <List bulleted size="large" items={doc.fields}/>
            </Card.Content>
          </Card>
          <Card fluid color='yellow'>
            <Card.Content>
              <Card.Header><Icon color="yellow" name="bullhorn"/>Description</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>{doc.about}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
      <div className="my-organization-bottom" >
        <Button inverted size= "big" color="blue"><Link to="/signin">Edit My Organization Profile</Link></Button>
      </div>
    </Segment>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
MyOrganizationProfile.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  const subscription = OrganizationProfiles.subscribe();
  const ready = subscription.ready();
  const doc = ready ? OrganizationProfiles.findDoc({ username: currentUser }) : undefined;
  return {
    doc,
    ready,
  };
})(MyOrganizationProfile);
