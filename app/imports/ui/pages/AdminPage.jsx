import React from 'react';
import { Container } from 'semantic-ui-react';
import AdminTabs from '../components/AdminTabs';

const AdminPage = () => (
  <Container>
    <div>
      <h1 className="ui center aligned header">
        Admin Page
      </h1>
    </div>
    <AdminTabs/>
  </Container>
);

export default AdminPage;
