import React, { useState } from 'react';
import { Accordion, Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import { MyUrl } from './MyUrl';

/** Renders a single row in the Browse Opportunity table. See pages/BrowseOpportunity.jsx. */
const BookmarkedOpportunity = ({ opportunity, bookmarks }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    e.preventDefault();
    // console.log(titleProps);
    const newIndex = activeIndex === titleProps.index ? -1 : titleProps.index;
    setActiveIndex(newIndex);
  };

  const currentUser = Meteor.user()?.username;
  const bkmkID = bookmarks.map(bookmark => bookmark.opportunityID);
  let check = false;
  if (bkmkID.includes(opportunity._id)) {
    check = true;
  }

  return (
    ((currentUser === bookmarks.bookmarkOwner && check) ?
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
          <Card.Meta>Category: {opportunity.category}</Card.Meta>
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
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
          <Card.Content extra>
            <Icon name='user'/>
            {opportunity.owner}
          </Card.Content>)
          : ''}
        <Card.Content extra>
          <Button color='blue' as={NavLink} exact to={`/edit-opportunity/${opportunity._id}`}>
                Edit
          </Button>
          <Button color='red'>
                Delete
          </Button>
        </Card.Content>
      </Card>
      : ' ')
  );
};

// Require a document to be passed to this component.
BookmarkedOpportunity.propTypes = {
  opportunity: PropTypes.shape({
    title: PropTypes.string,
    opportunityType: PropTypes.string,
    startDate: PropTypes.date,
    endDate: PropTypes.date,
    recurring: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.array,
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
    ageGroup: PropTypes.array,
    environment: PropTypes.array,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  bookmarks: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(BookmarkedOpportunity);
