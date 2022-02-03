import React from 'react';
import { Container, Loader, Card, Search } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/StuffCollection';
import OrgItem from '../components/OrgItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListOrg = ({ ready }) => ((ready) ? (
  <Container>
    <Search placeholder="Search for Organization"/>
    <Card.Group itemsPerRow={5}>
      <OrgItem/>
      <OrgItem/>
      <OrgItem/>
      <OrgItem/>
      <OrgItem/>
      <OrgItem/>
      <OrgItem/>
      <OrgItem/>
      <OrgItem/>
      <OrgItem/>
    </Card.Group>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Stuff documents in the props.
ListOrg.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Stuffs.subscribeStuff();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents and sort them by name.
  const stuffs = Stuffs.find({}, { sort: { name: 1 } }).fetch();
  return {
    stuffs,
    ready,
  };
})(ListOrg);
