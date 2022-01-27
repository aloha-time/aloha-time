import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const VolunteerProfile = ({ volunteer }) => (
  <Table.Row>
    <Table.Cell>{volunteer.events}</Table.Cell>
    <Table.Cell>
      <Link className={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT} to={`/edit/${volunteer._id}`}>Edit</Link>
    </Table.Cell>
  </Table.Row>
);

// Require a document to be passed to this component.
VolunteerProfile.propTypes = {
  volunteer: PropTypes.shape({
    name: PropTypes.string,
    totalHours: PropTypes.number,
    events: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VolunteerProfile);
