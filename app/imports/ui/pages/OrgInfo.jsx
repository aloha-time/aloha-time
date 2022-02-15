import React from 'react';
import { Container, Loader, Grid, Embed, Header, Feed } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection'
import OrgItem2 from '../components/OrgItem2';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const OrgInfo = ({ ready, orgs }) => ((ready) ? (
  <Container>
    <Grid columns='equal'>
      <Grid.Column>
        {orgs.map((org) => <OrgItem2 key={org._id} org={org}/>)}
      </Grid.Column>
      <Grid.Column>
        <Feed>
          <Header as="h3" textAlign="center">Activity Feed</Header>
          <Feed.Event
            icon='pencil'
            date='Today'
            summary='Organization has posted a new opportunity'
          />
          <Feed.Event
            icon='pencil'
            date='Today'
            summary='Organization has posted a new opportunity'
          />
          <Feed.Event
            icon='pencil'
            date='Today'
            summary='Organization has posted a new opportunity'
          />
        </Feed>
      </Grid.Column>
      <Grid.Column>
        <Header as="h3" textAlign="center">Media Feed</Header>
        <Embed
          id='dQw4w9WgXcQ'
          source='youtube'
        />
      </Grid.Column>
    </Grid>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
OrgInfo.propTypes = {
  orgs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = OrganizationProfiles.subscribeOrg();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents and sort them by name.
  const orgs = OrganizationProfiles.find({}, { sort: { orgName: 1 } }).fetch();
  return {
    orgs,
    ready,
  };
})(OrgInfo);
