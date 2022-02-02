import React from 'react';
import { Accordion, Card, Icon, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Opportunity table. See pages/ListOpportunity.jsx. */
class OpportunityCard extends React.Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const OpportunityInfo = this.props.opportunity;
    const { activeIndex } = this.state;
    return (
      <Card>
        <Image large src={OpportunityInfo.coverImage} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{OpportunityInfo.title}</Card.Header>
          <Card.Meta>{OpportunityInfo.startDate}</Card.Meta>
          <Card.Meta>{OpportunityInfo.endDate}</Card.Meta>
          <Card.Meta>{OpportunityInfo.location}</Card.Meta>
          <Card.Meta>{OpportunityInfo.category}</Card.Meta>
          <Card.Description>
            <Accordion exclusive={false}>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name='dropdown' />
                See details
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <List bulleted>
                  <List.Item>Description: {OpportunityInfo.description}</List.Item>
                  <List.Item>Type: {OpportunityInfo.opportunityType}</List.Item>
                  <List.Item>Reoccurring: {OpportunityInfo.recurring}</List.Item>
                  <List.Item>
                    Contact Info
                    <List.List>Name: {OpportunityInfo.contactName}</List.List>
                    <List.List>Position: {OpportunityInfo.contactPosition}</List.List>
                    <List.List>{OpportunityInfo.email}</List.List>
                    <List.List>{OpportunityInfo.phone}</List.List>
                    <List.List>{OpportunityInfo.website}</List.List>
                  </List.Item>
                  <List.Item>
                    Additional Info
                    <List.List>{OpportunityInfo.ageGroup}</List.List>
                    <List.List>{OpportunityInfo.environment}</List.List>
                  </List.Item>
                </List>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name='dropdown' />
                See images
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <Image large src={OpportunityInfo.galleryImage} wrapped ui={false} />
              </Accordion.Content>
            </Accordion>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/edit/${this.props.opportunity._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
OpportunityCard.propTypes = {
  opportunity: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OpportunityCard);
