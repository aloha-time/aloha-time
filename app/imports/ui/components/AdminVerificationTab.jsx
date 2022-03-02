import React from 'react';
import { Tab, Item } from 'semantic-ui-react';
import OrgVerifyList from './OrgVerifyList';
import VolunteerVerifyList from './VolunteerVerifyList';
import AdminSettingsForm from './AdminSettingsForm';

const panes = [
  { menuItem: 'Manage Account', render: () => <Tab.Pane>
    <AdminSettingsForm/>
  </Tab.Pane> },
  { menuItem: 'Manage Organizations', render: () => <Tab.Pane>
    <Item.Group divided>
      <OrgVerifyList/>
      <OrgVerifyList/>
      <OrgVerifyList/>
      <OrgVerifyList/>
      <OrgVerifyList/>
    </Item.Group>
  </Tab.Pane> },
  { menuItem: 'Manage Volunteers', render: () => <Tab.Pane>
    <Item.Group divided>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
    </Item.Group>
  </Tab.Pane> },
];

const AdminVerificationTab = () => <Tab menu={{ fluid: true, vertical: true, tabular: true }}panes={panes} />;

export default AdminVerificationTab;
