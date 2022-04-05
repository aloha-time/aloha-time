import React from 'react';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import AdminTabs from '../components/AdminTabs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';

const AdminPage = ({ ready }) => ((ready) ? (
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
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const OrgSubscription = OrganizationProfiles.subscribe();
  const VolSubscription = VolunteerProfiles.subscribe();
  const ready = OrgSubscription.ready() && VolSubscription.ready();
  const organization = OrganizationProfiles.find({}, { sort: { organizationName: 1 } }).fetch();
  const volunteer = VolunteerProfiles.find({}, { sort: { firstName: 1 } }).fetch();
  return {
    ready,
    organization,
    volunteer,
  };
})(AdminPage);
