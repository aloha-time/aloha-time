import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Render the About Us page */
const AboutUs = () => (
  <Container fluid id={PAGE_IDS.ABOUT_US}>
    <Container fluid textAlign='center' className='organization-sign-up-top'>
      <Header as='h1' textAlign='center' inverted>
        About VolunteerAlly
      </Header>
    </Container>
    <Container className='about-us-content'>
      <Header as='h2' textAlign='left'>
        An Easier Way to Volunteer
      </Header>
      <p>
        {/* eslint-disable-next-line max-len */}
        VolunteerAlly is a non-profit organization designed to help pair volunteers with organizations in need of service. On our site you can find numerous organizations and their volunteer opportunites all in one place. Once a user, you will have access to sign up for the various volunteer opportunities, from one-time opportunities to flexible/reoccuring opportunities. VolunteerAlly is designed to make volunteering easy.
      </p>
      <Header as='h2' textAlign='left'>
        Why VolunteerAlly?
      </Header>
      <p>
        Volunteer opportunities are vitally important to the wellbeing of a community. VolunteerAlly makes it easy for volunteers to find organizations in need, and for organizations to find qualified volunteers.
      </p>
      <br/>
      <p>
        VolunteerAlly makes it simple to give back.
      </p>
      <Header as='h2' textAlign='left'>
        VolunteerAlly Team
      </Header>
      <p>
        <b>Board Chair:</b> Leslie Kobayashi
      </p>
      <p>
        <b>Board Vice-Chair:</b> Ronald Sakamoto
      </p>
      <p>
        <b>President:</b> C. Scott Wo
      </p>
      <p>
        <b>Director:</b> Malindi Brand
      </p>
      <br/>
      <br/>
      <p>
        <b>Executive Director:</b> Nancy Wo
      </p>
      <p>
        <b>Webmaster:</b> Chase Conching
      </p>
      <p>
        <b>Secretary:</b> Patricia McCarthy
      </p>
      <p>
        <b>Treasurer:</b> Jodi Ching
      </p>
      <br/>
      <br/>
      <p>
        <u><b>Launch Team</b></u>
      </p>
      <p> Curren Gaspar </p>
      <p> Jonathan Turner </p>
      <br/>
      <br/>
      <p>
        <b>Founder:</b> Allyson Wo
      </p>
    </Container>
  </Container>
);

export default AboutUs;
