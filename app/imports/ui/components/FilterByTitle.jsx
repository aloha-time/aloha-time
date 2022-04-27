import React from 'react';
import { Loader, Container, Segment, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityItem from './OpportunityItem';
import MultiSelectField from '../components/form-fields/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allOpportunities) => new SimpleSchema({
  opportunities: { type: Array, label: 'Opportunities', optional: true },
  'opportunities.$': { type: String, allowedValues: allOpportunities },
});
console.log(`makeSchema: ${makeSchema}`);

/** Renders a table containing all the Opportunity documents. Use <OpportunityItem> to render each row. */
class FilterByTitle extends React.Component {

  constructor(props) {
    super(props);
    this.state = { opportunities: [] };
  }

  submit(data) {
    this.setState({ opportunities: data.opportunities || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allOpportunities1 = _.pluck(Opportunities.find({}, {}).fetch(), 'title');
    const formSchema1 = makeSchema(allOpportunities1);
    const bridge1 = new SimpleSchema2Bridge(formSchema1);
    const opportunityList1 = Opportunities.find({ title: { $in: this.state.opportunities } }, {}).fetch();

    console.log(allOpportunities1);
    console.log(formSchema1);
    console.log(bridge1);
    console.log(opportunityList1);
    console.log(this.state.opportunities);

    return (
      <Container>
        <AutoForm style={{ paddingBottom: '20px' }} schema={bridge1} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField label='' id='opportunities' name='opportunities' showInlineError={true}
              placeholder={'Find by Title'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group stackable itemsPerRow={1} centered>{opportunityList1.map((opportunities, index) => <OpportunityItem
          key={index}
          opportunity={opportunities}/>)}
        </Card.Group>
      </Container>
    );
  }

}

// Require a document to be passed to this component.
FilterByTitle.propTypes = {
  opportunities: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Opportunity documents and sort them by name.
  const opportunities = Opportunities.find({ verification: 'Verified' }, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(FilterByTitle);
