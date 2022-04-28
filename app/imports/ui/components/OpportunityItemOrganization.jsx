import React, { useState } from 'react';
import { Accordion, Button, Card, Icon, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { MyUrl } from './MyUrl';
import { removeItMethod } from '../../api/opportunity/OpportunitiesCollection.methods';

/** Renders a single row in the List Opportunity Organization table. See pages/ListOpportunityOrganization.jsx. */
const OpportunityItemOrganization = ({ opportunity }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    e.preventDefault();
    // console.log(titleProps);
    const newIndex = activeIndex === titleProps.index ? -1 : titleProps.index;
    setActiveIndex(newIndex);
  };

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

  return (
    <Card link fluid>
      <Image large src={MyUrl(opportunity.coverImage)} wrapped ui={false} as={NavLink}
        exact to={`/view-opportunity/${opportunity._id}`}/>
      <Card.Content>
        <Card.Header>
          <h1>{opportunity.title}</h1>
        </Card.Header>
        <Card.Meta>
          <Icon name='calendar alternate'/>
          {opportunity.startDate.toLocaleDateString('en-US')} - {opportunity.endDate.toLocaleDateString('en-US')}
        </Card.Meta>
        <Card.Meta>
          <Icon name='clock'/>
          {opportunity.startDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')} - {opportunity.endDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')}
        </Card.Meta>
        <Card.Meta>
          <Icon name='map marker alternate'/>
          {opportunity.location}
        </Card.Meta>
        <Card.Meta>
          <Icon name='block layout'/>
          <List horizontal bulleted items={opportunity.category}/>
        </Card.Meta>
      </Card.Content>
      <Card.Content>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <h4>
              <Icon name='dropdown'/>
                See more
            </h4>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
              {opportunity.description}
            </p>
          </Accordion.Content>
        </Accordion>
      </Card.Content>
      <Card.Content extra>
        <Button color='blue' as={NavLink} exact to={`/edit-opportunity/${opportunity._id}`}>
            Edit
        </Button>
        <Button color='red' onClick={() => removeItem(opportunity)}>
            Delete
        </Button>
      </Card.Content>
    </Card>
  );
};

// Require a document to be passed to this component.
OpportunityItemOrganization.propTypes = {
  opportunity: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.date,
    endDate: PropTypes.date,
    description: PropTypes.string,
    category: PropTypes.array,
    location: PropTypes.string,
    coverImage: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OpportunityItemOrganization);
