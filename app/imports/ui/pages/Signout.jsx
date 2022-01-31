import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Segment } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
const Signout = () => {
  Meteor.logout();
  return (
    <div className="sign-out">
      <Segment stacked basic>
        <Container id={PAGE_IDS.SIGN_OUT} textAlign="center">
          <Header as='h1' color="blue">You are now logged out</Header>
          <Header as= 'h1' color='yellow'>Thank you and have a great day :) !!!</Header>
        </Container>
      </Segment>
    </div>
  );
};

export default Signout;
