import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Item, Segment, Header, Grid } from 'semantic-ui-react';
import OrgVerifyList from './OrgVerifyList';
import VolunteerVerifyList from './VolunteerVerifyList';
import AdminSettingsForm from './AdminSettingsForm';
import AdminOrgSearch from './AdminOrgSearch';
import AdminVolunteerSearch from './AdminVolunteerSearch';

const panes = ({ organizations }) => [
  // eslint-disable-next-line react/display-name
  { menuItem: 'Manage Account', render: () => <Tab.Pane>
    <AdminSettingsForm/>
  </Tab.Pane> },
  // eslint-disable-next-line react/display-name
  { menuItem: 'Manage Organizations', render: () => <Tab.Pane>
    <AdminOrgSearch source={organizations}/>
    <Item.Group divided>
      <OrgVerifyList/>
      <OrgVerifyList/>
      <OrgVerifyList/>
      <OrgVerifyList/>
      <OrgVerifyList/>
    </Item.Group>
  </Tab.Pane> },
  // eslint-disable-next-line react/display-name
  { menuItem: 'Manage Volunteers', render: () => <Tab.Pane>
    <AdminVolunteerSearch/>
    <Item.Group divided>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
    </Item.Group>
  </Tab.Pane> },
];

panes.displayName = 'panes';

const AdminTabs = ({ organizations }) => <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes(organizations)}/>;

AdminTabs.propTypes = {
  organizations: PropTypes.array.isRequired,
};

export default AdminTabs;
