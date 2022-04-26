import React from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { MyUrl } from './MyUrl';
import { removeItMethod, updateMethod } from '../../api/opportunity/OpportunitiesCollection.methods';

const OppVerifyItem = ({ opportunity }) => {

  const removeItem = (opp) => {
    removeItMethod.callPromise({ instance: opp }).catch(error => {
      const message = `${error.message}`;
      swal('Error', message, 'error');
    });
    swal({
      title: 'Removed!',
      text: 'You have removed an opportunity!',
      icon: 'success',
    });
  };

  const verifyItem = (opp) => {
    const updateData = {};
    updateData.id = opp._id;
    updateData.verification = 'Verified';
    updateMethod.callPromise({ updateData });
    swal({
      title: 'Verified!',
      text: 'You have verified an opportunity!',
      icon: 'success',
    });
  };

  return (
    <Item>
      <Item.Image src={MyUrl(opportunity.coverImage)}/>
      <Item.Content verticalAlign='middle'>
        <Item.Header as='a'>{opportunity.title}</Item.Header>
        <Item.Meta>
          <span>{opportunity.opportunityType}</span>
        </Item.Meta>
        <Item.Extra>
          <Segment.Inline>
            <Button.Group>
              <Button onClick={() => removeItem(opportunity)}>Remove</Button>
              <Button.Or/>
              <Button positive onClick={() => verifyItem(opportunity)}>Verify</Button>
            </Button.Group>
          </Segment.Inline>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

OppVerifyItem.propTypes = {
  opportunity: PropTypes.shape({
    title: PropTypes.string,
    opportunityType: PropTypes.string,
    coverImage: PropTypes.string,
  }).isRequired,
};

export default OppVerifyItem;
