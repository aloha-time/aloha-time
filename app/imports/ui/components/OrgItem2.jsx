import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Image, Grid, Header, List, Divider, Segment, Card, Icon } from 'semantic-ui-react';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import PropTypes from 'prop-types';
import CustomDotGroup from '../components/CustomDotGroup';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { MyUrl } from '../components/MyUrl';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityItem from './OpportunityItem';

const columnStyle = { paddingTop: '9em' };
const socialMediaStyle = { paddingTop: '13em' };
const margSides = { marginLeft: '4em', marginRight: '4em' };

/** Renders a single card in the Organization Library. See pages/ListOrg.jsx. */
const OrgItem2 = ({ org, opportunities }) => (
  <Container fluid>
    <div className="my-organization-top">
      <Image size='medium' src="/images/VAlogo.png" centered/>
    </div>
    <Grid style={margSides}>
      <Grid.Row>
        <Grid.Column width={4} style={columnStyle}>
          <Image centered size='medium' src={MyUrl(org.image)} />
        </Grid.Column>
        <Grid.Column verticalAlign='middle' width={7} style={columnStyle}>
          <Header as='h1'>
            {org.organizationName}
          </Header>
          <Header as='h4'>
            {org.fields}
          </Header>
          <Header as='h4'>
            Primary Contact Name: {org.firstName} {org.lastName}
          </Header>
        </Grid.Column>
        <Grid.Column width={5} style={socialMediaStyle}>
          <Header as='h3'> Keep in touch with us! </Header>
          <List relaxed>
            <List.Item>
              <List.Icon name='facebook official' />
              <List.Content>
                <a href='https://www.facebook.com/'> Facebook </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='instagram' />
              <List.Content>
                <a href='https://www.facebook.com/'> Instagram </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='twitter' />
              <List.Content>
                <a href='https://www.facebook.com/'> Twitter </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='youtube' />
              <List.Content>
                <a href='https://www.facebook.com/'> YouTube </a>
              </List.Content>
            </List.Item>
          </List>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={margSides}>
        <Grid.Column width={11} verticalAlign='middle'>
          <Header as='h1'>
            About us
          </Header>
          <Header as='h4'>
            {org.about}
          </Header>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment padded='very'>
            <Header as='h3'> Important Information </Header>
            <List relaxed>
              <List.Item>
                <List.Icon name='location arrow' />
                <List.Content>{org.primaryAddress} {org.state} {org.city} {org.zipCode}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='phone' />
                <List.Content> {org.phoneNumber} </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='mail' />
                <List.Content> {org.email} </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='linkify' />
                <List.Content>
                  <a href={org.websiteLink}>{org.websiteLink}</a>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={margSides}>
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
                <Image size = 'large' src={MyUrl(org.galleryImg1)}/>
              </Slide>
              <Slide index={1}>
                <Image size = 'large' src={MyUrl(org.galleryImg2)}/>
              </Slide>
              <Slide index={2}>
                <Image size = 'large' src={MyUrl(org.galleryImg3)}/>
              </Slide>
              <Slide index={3}>
                <Image size = 'large' src={MyUrl(org.galleryImg4)}/>
              </Slide>
              <Slide index={4}>
                <Image size = 'large' src={MyUrl(org.galleryImg5)}/>
              </Slide>
              <Slide index={5}>
                <Image size = 'large' src={MyUrl(org.galleryImg6)}/>
              </Slide>
            </Slider>
            <Divider />
            <CustomDotGroup slides={6} />
          </CarouselProvider>
        </Grid.Column>
        <Grid.Column width={7} centered>
          <Header as='h1' textAlign='center'>
            Recent Opportunities
          </Header>
          <Segment style={{ overflow: 'auto', maxHeight: 450 }}>
            {opportunities.length !== 0 ? (
              <Card.Group centered>
                {opportunities.map((opportunity) => <OpportunityItem key={opportunity._id} opportunity={opportunity} />)}
              </Card.Group>) : (
              <Card color='red' centered>
                <Card.Content>
                  <Icon size = 'large' color = 'red' name= 'alarm'/>
                  <Card.Header>
                    we do not have any opportunity now!
                  </Card.Header>
                  <Card.Content>
                    Thank you for your interest! <Icon size= 'large' color= 'yellow' name ='smile'/>
                  </Card.Content>
                </Card.Content>
              </Card>
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

// Require a document to be passed to this component.
// since it is only a mockup don't need to have this part finished yet
OrgItem2.propTypes = {
  org: PropTypes.object.isRequired,
  opportunities: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
export default withTracker((org) => {
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const opportunities = Opportunities.find({ owner: org.org.username }, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(OrgItem2);
