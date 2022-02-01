import React from 'react';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

const headerStyle = { paddingTop: '4em' };

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotFound = () => (
  <div className="nf-div">
    <Container id={PAGE_IDS.NOT_FOUND} textAlign="center" fluid>
      <Header as="h1" textAlign="center" style={headerStyle}>
        Page not found
      </Header>
      <p>
        Click here to go to the home page.
      </p>
      <Button id='back-home' as={Link} to='/' animated>
        <Button.Content visible>Back Home</Button.Content>
        <Button.Content hidden>
          <Icon name='arrow right' />
        </Button.Content>
      </Button>
      <p id='nf-photo-credit'>
        Photo by
        <a href="https://unsplash.com/@oceancleanupgroup?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"> OCG Saving The Ocean </a>
        on <a href="https://unsplash.com/s/photos/volunteer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      </p>
    </Container>
  </div>
);

export default NotFound;
