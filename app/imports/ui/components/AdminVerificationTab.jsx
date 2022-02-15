import React from 'react';
import { Tab, Item } from 'semantic-ui-react';
import OrgVerifyList from './OrgVerifyList';
import VolunteerVerifyList from './VolunteerVerifyList';

const panes = [
  { menuItem: 'Organizations', render: () => <Tab.Pane>
    <Item.Group divided>
      <OrgVerifyList/>
      <OrgVerifyList/>
      <OrgVerifyList/>
      <OrgVerifyList/>
      <OrgVerifyList/>
    </Item.Group>
  </Tab.Pane> },
  { menuItem: 'Volunteers', render: () => <Tab.Pane>
    <Item.Group divided>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
      <VolunteerVerifyList/>
    </Item.Group>
  </Tab.Pane> },
];

const AdminVerificationTab = () => <Tab panes={panes} />;

export default AdminVerificationTab;
