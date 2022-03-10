import React from 'react';
import { Tab, Item } from 'semantic-ui-react';
import OrgVerifyList from './OrgVerifyList';
import VolunteerVerifyList from './VolunteerVerifyList';
import AdminSettingsForm from './AdminSettingsForm';
import AdminOrgSearch from './AdminOrgSearch';
import AdminVolunteerSearch from './AdminVolunteerSearch';

const panes = [
  // eslint-disable-next-line react/display-name
  { menuItem: 'Manage Account', render: () => <Tab.Pane>
    <AdminSettingsForm/>
  </Tab.Pane> },
  // eslint-disable-next-line react/display-name
  { menuItem: 'Manage Organizations', render: () => <Tab.Pane>
    <AdminOrgSearch/>
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

const AdminTabs = () => <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />;

export default AdminTabs;
