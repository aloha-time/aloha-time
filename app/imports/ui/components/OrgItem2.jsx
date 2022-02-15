import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const OrgItem2 = ({ org }) => (
  <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} /> {/* will call to the organization collection using something like org.logo */}
    <Card.Content>
      <Card.Header>{org.orgName}</Card.Header> {/* will call to the organization collection using something like org.name */}
      <Card.Meta>{org.fields}</Card.Meta> {/* will call to the organization collection using something like org.startDate */}
      <Card.Meta>{org.primaryAddress}</Card.Meta>
      <Card.Description>
        {org.about} {/* will call to the organization collection using something like org.missionStatement */}
      </Card.Description>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
// since it is only a mockup don't need to have this part finished yet
OrgItem2.propTypes = {
  org: PropTypes.shape({
    orgName: PropTypes.string,
    field: PropTypes.array,
    primaryAddress: PropTypes.string,
    about: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OrgItem2);
