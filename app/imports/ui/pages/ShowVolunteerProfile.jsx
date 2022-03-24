import React from 'react';
import { Container, Loader, Button, Header, Image, Grid, List, Segment, Divider, Item } from 'semantic-ui-react';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import CustomDotGroup from '../components/CustomDotGroup';
import 'pure-react-carousel/dist/react-carousel.es.css';

const headerStyle = { padding: '1em' };
const columnStyle = { paddingTop: '9em' };
const margSides = { marginLeft: '4em', marginRight: '4em' };
const margCarousel = { paddingTop: '4em', marginLeft: '3.25em', marginRight: '3.25em' };

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
        <Header as='h1' textAlign='center'>
            Hours volunteered
        </Header>
        <Header as='h2' textAlign='center'>
            0 hours
        </Header>
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
    <Grid style={margCarousel} >
      <Grid.Column width={8} className='volunteerCarousel'>
        <Header as='h1' textAlign='center'>
          Memories
        </Header>
        <CarouselProvider
          totalSlides={6}
          isIntrinsicHeight={true}
        >
          <Slider>
            <Slide index={0}>
              <Image src="https://149366112.v2.pressablecdn.com/wp-content/uploads/2014/05/1959781_10152032231622849_2043556589_n.jpg" />
            </Slide>
            <Slide index={1}>
              <Image src="https://www.peggyadams.org/sites/default/files/images/2018-03/volunteer-PA.jpg " />
            </Slide>
            <Slide index={2}>
              <Image src="https://humaneloudoun.org/wp-content/uploads/2020/01/AnimalServicesVolunteer.jpg" />
            </Slide>
            <Slide index={3}>
              <Image src="https://images.everydayhealth.com/images/coronavirus/how-and-where-to-volunteer-safely-during-the-pandemic-rm-722x406.jpg?sfvrsn=e1c370c2_1" />
            </Slide>
            <Slide index={4}>
              <Image src="https://www.californiavolunteers.ca.gov/wp-content/uploads/2021/02/Matthew.png" />
            </Slide>
            <Slide index={5}>
              <Image src="https://coda.newjobs.com/api/imagesproxy/ms/niche/images/articles/Liz/volunteering.jpg" />
            </Slide>
          </Slider>
          <Divider />
          <CustomDotGroup slides={6} />
        </CarouselProvider>
        <Button> Upload Image </Button>
      </Grid.Column>
      <Grid.Column width={6} floated='right'>
        <Header as='h1' textAlign='center'>
          Completed Opportunities
        </Header>
        <Item.Group relaxed>
          <Item>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='a'>Opportunity 1</Item.Header>
            </Item.Content>
          </Item>
          <Item>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='a'>Opportunity 2</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Grid.Column>
    </Grid>
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
