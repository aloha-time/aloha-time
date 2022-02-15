import React from 'react';
import { Button, Dropdown, Item, Segment } from 'semantic-ui-react';

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Volunteer', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Delete Volunteer', value: 'delete' },
];

const VolunteerVerifyList = () => (
  <Item>
    <Item.Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' />
    <Item.Content verticalAlign='middle'>
      <Item.Header as='a'>Volunteer Name</Item.Header>
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

export default VolunteerVerifyList;
