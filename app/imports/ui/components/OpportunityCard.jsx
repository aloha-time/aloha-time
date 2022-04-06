import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the Browse Opportunity table. See pages/BrowseOpportunity.jsx. */
const OpportunityCard = ({ opportunity }) => (
  <Card link fluid>
    <Image large src={opportunity.coverImage} wrapped ui={false} as={NavLink}
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
        {opportunity.startDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')} - {opportunity.endDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')}</Card.Meta>
      <Card.Meta>
        <Icon name='map marker alternate'/>
        {opportunity.location}
      </Card.Meta>
      <Card.Meta>Category: {opportunity.category}</Card.Meta>
    </Card.Content>
    <Card.Content as={NavLink} exact to={`/view-opportunity/${opportunity._id}`}>
      <h4>See more</h4>
    </Card.Content>
    <Card.Content extra>
      <Button color='blue' as={NavLink} exact to={`/edit-opportunity/${opportunity._id}`}>
        Edit
      </Button>
      <Button color='red'>
        Delete
      </Button>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
OpportunityCard.propTypes = {
  opportunity: PropTypes.shape({
    title: PropTypes.string,
    opportunityType: PropTypes.string,
    startDate: PropTypes.date,
    endDate: PropTypes.date,
    recurring: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    location: PropTypes.string,
    contactName: PropTypes.string,
    contactPosition: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
    coverImage: PropTypes.string,
    galleryImg1: PropTypes.string,
    galleryImg2: PropTypes.string,
    galleryImg3: PropTypes.string,
    galleryImg4: PropTypes.string,
    ageGroup: PropTypes.string,
    environment: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OpportunityCard);
