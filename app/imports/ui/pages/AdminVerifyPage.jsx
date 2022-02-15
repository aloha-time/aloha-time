import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Loader } from 'semantic-ui-react';
import AdminVerification from '../components/AdminVerification';

const AdminVerifyPage = ({ ready }) => ((ready) ? (
  <Container>
    <div>
      <h1 className="ui center aligned header">
        Verify User
      </h1>
    </div>
    <AdminVerification/>
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
