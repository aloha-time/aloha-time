import React from 'react';
import { Button, Dropdown, Item, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Organization', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Delete Organization', value: 'delete' },
];

const OrgVerifyItem = ({ organization }) => (
  <Item>
    <Item.Image src={organization.image} />
    <Item.Content verticalAlign='middle'>
      <Item.Header as='a'>{organization.organizationName}</Item.Header>
      <Item.Meta>
        <span>{organization.firstName} {organization.lastName}</span>
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

OrgVerifyItem.propTypes = {
  organization: PropTypes.shape({
    organizationName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default OrgVerifyItem;
