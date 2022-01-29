import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Segment } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
const Signout = () => {
  Meteor.logout();
  return (
    <div className="sign-out">
      <Segment stacked>
        <Container id={PAGE_IDS.SIGN_OUT} as="h2" textAlign="center">
          <p>You are now logged out</p>
          <p>Thank you and have a great day.</p>
        </Container>
      </Segment>
    </div>
  );
};

export default Signout;
