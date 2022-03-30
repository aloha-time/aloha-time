import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { MyUrl } from '../components/MyUrl';
/** Renders a single card in the Organization Library page. See pages/ListOrg.jsx. */
const OrgItem = ({ org }) => (
  <Card>
    <Image src={MyUrl(org.image)} wrapped ui={false} /> {/* will call to the organization collection using something like org.logo */}
    <Card.Content>
      <Card.Header>{org.organizationName}</Card.Header> {/* will call to the organization collection using something like org.name */}
      <Card.Meta>{org.fields}</Card.Meta> {/* will call to the organization collection using something like org.type */}
      <Link to={`/orginfo/${org._id}`}>More info</Link> {/* Eventually this line will have the id for the specific organization */}
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
// since it is only a mockup don't need to have this part finished yet
OrgItem.propTypes = {
  org: PropTypes.shape({
    image: PropTypes.string,
    organizationName: PropTypes.string,
    fields: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OrgItem);
