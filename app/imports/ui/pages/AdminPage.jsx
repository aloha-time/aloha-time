import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Loader } from 'semantic-ui-react';
import AdminTabs from '../components/AdminTabs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';

const AdminPage = ({ ready, organization }) => ((ready) ? (
  <Container>
    <div>
      <h1 className="ui center aligned header">
        Admin Page
      </h1>
    </div>
    <AdminTabs/>
  </Container>
) : <Loader active>Getting data</Loader>);

AdminPage.propTypes = {
  organization: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = OrganizationProfiles.subscribe();
  const ready = subscription.ready();
  const organization = OrganizationProfiles.find().fetch();
  return {
    ready,
    organization,
  };
})(AdminPage);
