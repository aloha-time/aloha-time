import React, { useState } from 'react';
import { Loader, Container, Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Opportunities, opportunityAges } from '../../api/opportunity/OpportunitiesCollection';
import MultiSelectField from './form-fields/MultiSelectField';
import OpportunityItem from './OpportunityItem';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const FilterByAge = ({ ready }) => {

  /* useState for submitting. Initial state is an empty array [] */
  const [select, setSelect] = useState({ ageGroup: [] });

  /* On submit insert the data */
  const submit = (data) => {
    setSelect(data);
  };

  /* Clicking will clear the form fields */
  const clear = (formRef) => {
    formRef.reset();
  };

  /* return an array of selected age groups */
  const ages = select.ageGroup;

  /* Form Schema used for the MultiSelectField, select multiple fields */
  const formSchema = new SimpleSchema({
    ageGroup: {
      type: Array,
    },
    'ageGroup.$': {
      type: String,
      allowedValues: opportunityAges,
    },
  });

  /* bridge the Simple Schema */
  const bridge = new SimpleSchema2Bridge(formSchema);

  /* Use $in operator to match values of the passed array on the Opportunities collection. Returns matching opportunities */
  const selectList = Opportunities.find({ ageGroup: { $in: ages } }, {}).fetch();

  let fRef = null;

  return ((ready) ? (
    <Container>
      <AutoForm ref={ref => {
        fRef = ref;
      }} style={{ paddingBottom: '20px' }} schema={bridge} onSubmit={data => submit(data)}>
        <MultiSelectField id='ageGroup' name='ageGroup' label='' showInlineError={true}
          placeholder={'Find by Age Group'}/>
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
FilterByAge.propTypes = {
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
})(FilterByAge);
