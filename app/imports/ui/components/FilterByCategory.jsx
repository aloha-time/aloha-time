import React, { useState } from 'react';
import { Loader, Container, Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Opportunities, opportunityCategories } from '../../api/opportunity/OpportunitiesCollection';
import MultiSelectField from './form-fields/MultiSelectField';
import OpportunityItem from './OpportunityItem';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const FilterByCategory = ({ ready }) => {

  /* useState for submitting. Initial state is an empty array [] */
  const [select, setSelect] = useState({ category: [] });

  /* On submit insert the data */
  const submit = (data) => {
    setSelect(data);
  };

  /* Clicking will clear the form fields */
  const clear = (formRef) => {
    formRef.reset();
  };

  /* return an array of selected categories */
  const categs = select.category;

  /* Form Schema used for the MultiSelectField, select multiple fields */
  const formSchema = new SimpleSchema({
    category: {
      type: Array,
    },
    'category.$': {
      type: String,
      allowedValues: opportunityCategories,
    },
  });

  /* bridge the Simple Schema */
  const bridge = new SimpleSchema2Bridge(formSchema);

  /* Use $in operator to match values of the passed array on the Opportunities collection. Returns matching opportunities */
  const selectList = Opportunities.find({ category: { $in: categs } }, {}).fetch();

  let fRef = null;

  return ((ready) ? (
    <Container>
      <AutoForm ref={ref => {
        fRef = ref;
      }} style={{ paddingBottom: '20px' }} schema={bridge} onSubmit={data => submit(data)}>
        <MultiSelectField id='category' name='category' label='' showInlineError={true}
          placeholder={'Find by Category'}/>
        <SubmitField id='submit' value='Submit'/>
        <Button color='red' onClick={() => clear(fRef)}>
          Clear
        </Button>
      </AutoForm>
      <Card.Group stackable itemsPerRow={4} centered>{selectList.map((opportunities) => <OpportunityItem
        key={opportunities._id}
        opportunity={opportunities}/>)}
      </Card.Group>
    </Container>
  ) : <Loader active>Getting data</Loader>);
};

// Require a document to be passed to this component.
FilterByCategory.propTypes = {
  opportunities: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
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
})(FilterByCategory);
