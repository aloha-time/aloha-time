import React from 'react';
import { Accordion, Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Opportunity table. See pages/ListOpportunity.jsx. */
class OpportunityItemOrganization extends React.Component {
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
      <Card link fluid>
        <Image large src={OpportunityInfo.coverImage} wrapped ui={false} as={NavLink}
          exact to={`/view-opportunity/${this.props.opportunity._id}`}/>
        <Card.Content>
          <Card.Header>
            <h1>{OpportunityInfo.title}</h1>
          </Card.Header>
          <Card.Meta>
            <Icon name='calendar alternate'/>
            {OpportunityInfo.startDate.toLocaleDateString('en-US')} - {OpportunityInfo.endDate.toLocaleDateString('en-US')}
          </Card.Meta>
          <Card.Meta>
            <Icon name='clock'/>
            {OpportunityInfo.startDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')} - {OpportunityInfo.endDate.toLocaleTimeString('en-US').replace(/:\d+ /, ' ')}</Card.Meta>
          <Card.Meta>
            <Icon name='map marker alternate'/>
            {OpportunityInfo.location}
          </Card.Meta>
          <Card.Meta>Category: {OpportunityInfo.category}</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <h4><Icon name='dropdown'/>
                See more</h4>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <p>
                {OpportunityInfo.description}
              </p>
            </Accordion.Content>
          </Accordion>
        </Card.Content>
        <Card.Content extra>
          <Button color='blue' as={NavLink} exact to={`/edit-opportunity/${this.props.opportunity._id}`}>
            Edit
          </Button>
          <Button color='red'>
            Delete
          </Button>
        </Card.Content>
        <Card.Content extra>
          <Icon name='user'/>
          {OpportunityInfo.owner}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
OpportunityItemOrganization.propTypes = {
  opportunity: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OpportunityItemOrganization);
