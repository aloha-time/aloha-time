import React from 'react';
import { Button, Dropdown, Item, Segment } from 'semantic-ui-react';

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Organization', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Delete Organization', value: 'delete' },
];

const OrgVerifyList = () => (
  <Item>
    <Item.Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' />
    <Item.Content verticalAlign='middle'>
      <Item.Header as='a'>Organization Name</Item.Header>
      <Item.Meta>
        <span>Organization Person Name</span>
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

export default OrgVerifyList;
