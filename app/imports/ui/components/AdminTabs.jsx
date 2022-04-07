import React from 'react';
import { Tab, Item } from 'semantic-ui-react';
import OrgVerifyList from './OrgVerifyList';
import VolunteerVerifyList from './VolunteerVerifyList';
import AdminSettingsForm from './AdminSettingsForm';
import OppVerifyList from './OppVerifyList';

const panes = [
  // eslint-disable-next-line react/display-name
  { menuItem: 'Manage Account', render: () => <Tab.Pane>
    <AdminSettingsForm/>
  </Tab.Pane> },
  // eslint-disable-next-line react/display-name
  { menuItem: 'Manage Organizations', render: () => <Tab.Pane>
    <OrgVerifyList/>
  </Tab.Pane> },
  // eslint-disable-next-line react/display-name
  { menuItem: 'Manage Volunteers', render: () => <Tab.Pane>
    <Item.Group divided>
      <VolunteerVerifyList/>
    </Item.Group>
  </Tab.Pane> },
  // eslint-disable-next-line react/display-name
  { menuItem: 'Verify Opportunities', render: () => <Tab.Pane>
    <OppVerifyList/>
  </Tab.Pane> },
];

const AdminTabs = () => <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>;

export default AdminTabs;
