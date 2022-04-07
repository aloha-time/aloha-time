import React from 'react';
import { Checkbox, Item, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { MyUrl } from './MyUrl';

/* const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Volunteer', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Delete Volunteer', value: 'delete' },
]; */

const OppVerifyItem = ({ opportunity }) => (
  <Item>
    <Item.Image src={MyUrl(opportunity.coverImage)} />
    <Item.Content verticalAlign='middle'>
      <Item.Header as='a'>{opportunity.title}</Item.Header>
      <Item.Meta>
        <span>{opportunity.opportunityType}</span>
      </Item.Meta>
      <Item.Extra>
        <Segment.Inline>
          <Checkbox label = 'Verify' />
          {/* <Button.Group floated='right' color='teal'>
            <Button>Options</Button>
            <Dropdown
              className='button icon'
              floating
              options={options}
              trigger={<></>}
            />
          </Button.Group> */}
        </Segment.Inline>
      </Item.Extra>
    </Item.Content>
  </Item>
);

OppVerifyItem.propTypes = {
  opportunity: PropTypes.shape({
    title: PropTypes.string,
    opportunityType: PropTypes.string,
    coverImage: PropTypes.string,
  }).isRequired,
};

export default OppVerifyItem;
