import React from 'react';
import { Grid, Header, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PAGE_IDS.LANDING}>
    <div className="landing-background">
      <Grid verticalAlign='middle' textAlign='center' container>
        <div className="VA-photo">
          <img src="/images/VAlogo.png" alt="Volunteer Ally's Logo"/>
          <div className="landing-header">
            <Header inverted size="medium">A better way to volunteer.</Header>
          </div>
          <Header inverted size="large">We connect passionate volunteers with charitable organizations in order to build community. Let us help you easily find service opportunities for organizations in your area of interest.</Header>
        </div>
      </Grid>
    </div>
    <Header className="opportunities" textAlign='center' size="huge">Dozens of Opportunities for Organizations and Volunteers</Header>
    <Grid textAlign='center' container>
      <Grid.Row columns={5}>
        <Grid.Column>
          <br></br>
          <br></br>
          <Header as="h3">Take a look at the various organizations Volunteer Ally works with, each with unique volunteer opportunities offering various dates, times, and locations.</Header>
          <p>Volunteer Ally is a non-profit organization match system designed to pair organizations with volunteers. We partner with various organizations in need of passionate volunteers. </p>
          <p>Becoming a user is required to ensure committed reliable volunteers for our organizations.</p>
          <Button size="huge" color="blue">Join Now!</Button>
        </Grid.Column>
        <Grid.Column>
          <Image size="small" src="/images/logo1.png"/>
          <Image size="small" src="/images/logo2.png"/>
          <Image size="small" src="/images/logo3.png"/>
          <Image size="small" src="/images/logo4.png"/>
        </Grid.Column>
        <Grid.Column>
          <Image size="small" src="/images/logo5.png"/>
          <Image size="small" src="/images/logo6.png"/>
          <Image size="small" src="/images/logo7.png"/>
          <Image size="small" src="/images/logo8.png"/>
        </Grid.Column>
        <Grid.Column>
          <Image size="small" src="/images/logo9.png"/>
          <Image size="small" src="/images/logo10.png"/>
          <Image size="small" src="/images/logo11.png"/>
          <Image size="small" src="/images/logo12.png"/>
        </Grid.Column>
        <Grid.Column>
          <Image size="small" src="/images/logo13.png"/>
          <Image size="small" src="/images/logo14.png"/>
          <Image size="small" src="/images/logo15.png"/>
          <Image size="small" src="/images/logo16.png"/>
        </Grid.Column>
        <Button size="huge" color="blue" as={NavLink} exact to="/browse-opportunities">View All Opportunities</Button>
      </Grid.Row>
    </Grid>
  </div>
);

export default Landing;
