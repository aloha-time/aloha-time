import React from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { MyUrl } from './MyUrl';
import { volRemoveItMethod } from '../../api/user/VolunteerProfileCollection.methods';

/* const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Volunteer', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Delete Volunteer', value: 'delete' },
]; */

const VolVerifyItem = ({ volunteer }) => {

  const removeItem = (vol) => {
    volRemoveItMethod.callPromise({ instance: vol }).catch(error => {
      const message = `${error.message}`;
      swal('Error', message, 'error');
    });
    swal({
      title: 'Removed!',
      text: 'You have removed an volunteer!',
      icon: 'success',
    });
  };

  return (
    <Item>
      <Item.Image src={MyUrl(volunteer.image)} />
      <Item.Content verticalAlign='middle'>
        <Item.Header as='a'>{volunteer.firstName} {volunteer.lastName}</Item.Header>
        <Item.Meta>
          {/* <span>{organization.firstName} {organization.lastName}</span> */}
        </Item.Meta>
        <Item.Extra>
          <Segment.Inline>
            <Button.Group>
              <Button onClick={() => removeItem(volunteer)}>Remove</Button>
              {/* <Button.Or/>
                <Button onClick={() => verifyItem(opportunity)}>Verify</Button> */}
            </Button.Group>
          </Segment.Inline>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

VolVerifyItem.propTypes = {
  volunteer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default VolVerifyItem;
