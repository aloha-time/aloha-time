import React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';

class OpportunityComponent extends React.Component {
  deleteBreak(_id) {
    this.props.surfBreakPage.initialValue = true;
    SurfBreakData.collection.remove(_id);
  }

  render() {
    return (
      <Card style={surfBreakCardStyle}>
        <Image src={this.props.surfBreak.image} wrapped ui={false}/>
        <Card.Content>
          <Card.Header style={blueTextStyle} id={ `#to-surf-${this.props.surfBreak._id}` } class='card-header'>
            <Link to={`/surfBreakPage/${this.props.surfBreak._id}`} >{this.props.surfBreak.name}</Link>
          </Card.Header>
          <Card.Meta>
            <span >{this.props.surfBreak.address}</span>
          </Card.Meta>
          <Card.Description style={surfBreakCardStyle}>
            {this.props.surfBreak.summary}
          </Card.Description>
        </Card.Content>
        <Card.Content >
          <Link to={`/surfBreakPage/${this.props.surfBreak._id}`}>Go to Surf Break page</Link>
        </Card.Content>
        {(this.props.currentUser === this.props.surfBreak.creatorUsername || this.props.currentUser === 'admin@foo.com') && (
          <Card.Content>
            <Link to={`/editSurfBreak/${this.props.surfBreak._id}`} >
              Edit this Surf Break
            </Link>
          </Card.Content>
        )}
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {this.props.surfBreak.followersIds.length} Friends are following this break
          </a>
        </Card.Content>
        {(this.props.currentUser === this.props.surfBreak.creatorUsername || this.props.currentUser === 'admin@foo.com')(
          <Card.Content extra>
            <Button className='deleteButton' onClick={() => this.deleteBreak(this.props.surfBreak._id)}>
              Delete {this.props.surfBreak.name}
            </Button>
          </Card.Content>
        )}
        <Card.Content extra>
          Added by {this.props.surfBreak.creatorUsername}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Opportunities.propTypes = {
  surfBreak: PropTypes.shape({
    name: PropTypes.string,
    followersIds: PropTypes.array,
    image: PropTypes.string,
    summary: PropTypes.string,
    address: PropTypes.string,
    creatorUsername: PropTypes.string,
    xPos: PropTypes.string,
    yPos: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.string,
  surfBreakPage: PropTypes.object,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Opportunities);
