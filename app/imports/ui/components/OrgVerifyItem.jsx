import React from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { MyUrl } from './MyUrl';
import { orgRemoveItMethod } from '../../api/user/OrganizationProfileCollection.methods';

/* const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Organization', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Delete Organization', value: 'delete' },
]; */

const OrgVerifyItem = ({ organization }) => {

  const removeItem = (org) => {
    orgRemoveItMethod.callPromise({ instance: org }).catch(error => {
      const message = `${error.message}`;
      swal('Error', message, 'error');
    });
    swal({
      title: 'Removed!',
      text: 'You have removed an organization!',
      icon: 'success',
    });
  };

  return (
    <Item>
      <Item.Image src={MyUrl(organization.image)}/>
      <Item.Content verticalAlign='middle'>
        <Item.Header as='a'>{organization.organizationName}</Item.Header>
        <Item.Meta>
          <span>{organization.firstName} {organization.lastName}</span>
        </Item.Meta>
        <Item.Extra>
          <Segment.Inline>
            <Button.Group>
              <Button onClick={() => removeItem(organization)}>Remove</Button>
              {/* <Button.Or/>
                <Button onClick={() => verifyItem(opportunity)}>Verify</Button> */}
            </Button.Group>
          </Segment.Inline>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

OrgVerifyItem.propTypes = {
  organization: PropTypes.shape({
    organizationName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default OrgVerifyItem;
