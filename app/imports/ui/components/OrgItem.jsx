import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const OrgItem = () => (
  <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} /> {/* will call to the organization collection using something like org.logo */}
    <Card.Content>
      <Card.Header>Organization Name</Card.Header> {/* will call to the organization collection using something like org.name */}
      <Card.Meta>Insert Organization Type Here</Card.Meta> {/* will call to the organization collection using something like org.type */}
      <Link to='/orginfo'>More info</Link> {/* Eventually this line will have the id for the specific organization */}
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
// since it is only a mockup don't need to have this part finished yet
OrgItem.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OrgItem);
