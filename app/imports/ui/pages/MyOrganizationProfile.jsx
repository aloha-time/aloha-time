import React from 'react';
import { Container, Grid, List, Loader, Image, Button, Segment, Header, Divider } from 'semantic-ui-react';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import CustomDotGroup from '../components/CustomDotGroup';
import { MyUrl } from '../components/MyUrl';
import 'pure-react-carousel/dist/react-carousel.es.css';

const headerStyle = { padding: '1em' };
const columnStyle = { paddingTop: '9em' };
const greyText = { color: 'grey' };
const margSides = { marginLeft: '4em', marginRight: '4em' };

/** Renders the page for my organization profile document. */
const MyOrganizationProfile = ({ orgProfile, ready }) => ((ready) ? (
  <Container fluid id={PAGE_IDS.MY_ORGANIZATION_PROFILE}>
    <div className="my-organization-top">
      <Image size='medium' src="/images/VAlogo.png" centered/>
    </div>
    <Grid style={headerStyle}>
      <Grid.Column width={3} style={columnStyle}>
        <Image centered size='small' src={MyUrl(orgProfile.image)} />
      </Grid.Column>
      <Grid.Column verticalAlign='middle' width={9} style={columnStyle}>
        <Header as='h1'>
          {orgProfile.organizationName}
        </Header>
        <Header as='h4' style={greyText}>
          Primary Contact Name: {orgProfile.firstName} {orgProfile.lastName}
        </Header>
      </Grid.Column>
      <Grid.Column width={3} verticalAlign='middle' style={columnStyle}>
        <List relaxed floated='right'>
          <List.Content>
            <Button><Link to="/username-change">Change username</Link></Button>
          </List.Content>
          <List.Content>
            <Button><Link to="/password-change">Change Password</Link></Button>
          </List.Content>
        </List>
      </Grid.Column>
      <Grid.Row style={margSides}>
        <Grid.Column width={9} verticalAlign='middle'>
          <Header as='h1'>
            About us
          </Header>
          <Header as='h4'>
            {orgProfile.about}
          </Header>
        </Grid.Column>
        <Grid.Column width={7}>
          <Segment padded='very'>
            <Header as='h3'> Important Information </Header>
            <List relaxed>
              <List.Item>
                <List.Icon name='location arrow' />
                <List.Content>{orgProfile.primaryAddress} {orgProfile.state} {orgProfile.city} {orgProfile.zipCode}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='phone' />
                <List.Content> {orgProfile.phoneNumber} </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='mail' />
                <List.Content> {orgProfile.email} </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='linkify' />
                <List.Content>
                  <a href={orgProfile.websiteLink}>{orgProfile.websiteLink}</a>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered style={margSides}>
        <Grid.Column width={9} className='organizationCarousel'>
          <Header as='h1' textAlign='center'>
            Gallery
          </Header>
          <CarouselProvider
            totalSlides={6}
            isIntrinsicHeight={true}
          >
            <Slider>
              <Slide index={0}>
                <Image size = 'large' src={MyUrl(orgProfile.galleryImg1)} />
              </Slide>
              <Slide index={1}>
                <Image size = 'large' src={MyUrl(orgProfile.galleryImg2)} />
              </Slide>
              <Slide index={2}>
                <Image size = 'large' src={MyUrl(orgProfile.galleryImg3)} />
              </Slide>
              <Slide index={3}>
                <Image size = 'large' src={MyUrl(orgProfile.galleryImg4)} />
              </Slide>
              <Slide index={4}>
                <Image size = 'large' src={MyUrl(orgProfile.galleryImg5)} />
              </Slide>
              <Slide index={5}>
                <Image size = 'large' src={MyUrl(orgProfile.galleryImg6)} />
              </Slide>
            </Slider>
            <Divider />
            <CustomDotGroup slides={6} />
          </CarouselProvider>
          <Button><Link to="/edit-my-organization-profile-images">Upload Image </Link></Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <div className="my-organization-bottom" >
      <Button inverted size= "big" color="blue"><Link to="/edit-my-organization-profile">Edit My Organization Profile</Link></Button>
    </div>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require the organization profile documents in the props.
MyOrganizationProfile.propTypes = {
  orgProfile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  const subscription = OrganizationProfiles.subscribe();
  const ready = subscription.ready();
  const orgProfile = ready ? OrganizationProfiles.findDoc({ username: currentUser }) : undefined;
  return {
    orgProfile,
    ready,
  };
})(MyOrganizationProfile);
