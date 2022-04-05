import React from 'react';
import { Button, Dropdown, Item, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { MyUrl } from './MyUrl';

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Volunteer', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Delete Volunteer', value: 'delete' },
];

const VolVerifyItem = ({ volunteer }) => (
  <Item>
    <Item.Image src={MyUrl(volunteer.image)} />
    <Item.Content verticalAlign='middle'>
      <Item.Header as='a'>{volunteer.firstName} {volunteer.lastName}</Item.Header>
      <Item.Meta>
        {/* <span>{organization.firstName} {organization.lastName}</span> */}
      </Item.Meta>
      <Item.Extra>
        <Segment.Inline>
          <Button.Group floated='right' color='teal'>
            <Button>Options</Button>
            <Dropdown
              className='button icon'
              floating
              options={options}
              trigger={<></>}
            />
          </Button.Group>
        </Segment.Inline>
      </Item.Extra>
    </Item.Content>
  </Item>
);

VolVerifyItem.propTypes = {
  volunteer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default VolVerifyItem;
