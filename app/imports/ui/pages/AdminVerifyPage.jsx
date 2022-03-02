import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Loader } from 'semantic-ui-react';
import AdminVerificationTab from '../components/AdminVerificationTab';

const AdminVerifyPage = ({ ready }) => ((ready) ? (
  <Container>
    <div>
      <h1 className="ui center aligned header">
        Admin Page
      </h1>
    </div>
    <AdminVerificationTab/>
  </Container>
) : <Loader active>Getting data</Loader>);

AdminVerifyPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = true;
  return {
    ready,
  };
})(AdminVerifyPage);
