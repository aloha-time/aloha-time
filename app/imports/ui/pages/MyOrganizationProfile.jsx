import React from 'react';
import { Container, Grid, List, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const MyOrganizationProfile = ({ doc, ready }) => ((ready) ? (
  <Container id={PAGE_IDS.MY_ORGANIZATION_PROFILE}>

    <div className="my-organization-top">
      <Image size='medium' src="/images/VAlogo.png" centered/>
    </div>
    <Grid className="my-organization-medium">
      <Grid.Row>
        <Image size='small' padding-left ='20px' src="/images/volunteerAllyIcon.svg"/>
      </Grid.Row>
    </Grid>
    <Grid textAlign="left" verticalAlign="middle" centered columns={2}>
      <Grid.Column>
        <List divided relaxed>
          <List.Item>
            <List.Icon color= "yellow" name='user circle' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Primary Contact First Name</List.Header>
              <List.Description as='a'>{doc.firstName}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon color= "yellow"name='user' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Primary Contact Last Name</List.Header>
              <List.Description as='a'>{doc.lastName}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon color= "yellow" name='mail' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Primary Contact E-mail Address</List.Header>
              <List.Description as='a'>{doc.email}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon color= "yellow" name='location arrow' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>primary Address</List.Header>
              <List.Description as='a'>{doc.primaryAddress}, {doc.city},{doc.state},{doc.zipCode}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon color= "yellow"name='list ul' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Fields</List.Header>
              <List.Description as='a'>{doc.fields}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon color= "yellow" name='warning circle' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Environmental</List.Header>
              <List.Description as='a'>{doc.environmental}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon color= "yellow" name='bullhorn' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Description</List.Header>
              <List.Description as='a'>{doc.about}</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Grid.Column>
    </Grid>
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
  console.log(currentUser);
  const subscription = OrganizationProfiles.subscribe();
  const ready = subscription.ready();
  const doc = ready ? OrganizationProfiles.findDoc({ username: currentUser }) : undefined;
  return {
    doc,
    ready,
  };
})(MyOrganizationProfile);
