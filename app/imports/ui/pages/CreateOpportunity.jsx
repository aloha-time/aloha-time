import React from 'react';
import { Grid, Segment, Header, Radio } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import {
  Opportunities,
  opportunityAges,
  opportunityCategories, opportunityEnvironments,
  opportunityTypes,
} from '../../api/opportunity/OpportunitiesCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  opportunityType: {
    type: String,
    allowedValues: opportunityTypes,
    defaultValue: 'event',
  },
  startDate: String,
  endDate: String,
  recurring: Boolean,
  description: String,
  category: {
    type: String,
    allowedValues: opportunityCategories,
  },
  location: String,
  contactName: String,
  contactPosition: String,
  email: String,
  phone: String,
  website: String,
  coverImage: String,
  galleryImage: String,
  ageGroup: {
    type: String,
    allowedValues: opportunityAges,
  },
  environment: {
    type: String,
    allowedValues: opportunityEnvironments,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
const CreateOpportunity = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, opportunityType, startDate, endDate, recurring, description, category, location, contactName, contactPosition, email, phone, website, coverImage, galleryImage, ageGroup, environment } = data;
    const owner = Meteor.user().username;
    const collectionName = Opportunities.getCollectionName();
    const definitionData = { title, opportunityType, startDate, endDate, recurring, description, category, location, contactName, contactPosition, email, phone, website, coverImage, galleryImage, ageGroup, environment, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Grid id={PAGE_IDS.CREATE_OPPORTUNITY} container centered>
      <Grid.Column>
        <Header as="h2" textAlign="center">Create a new listing</Header>
        <AutoForm ref={ref => {
          fRef = ref;
        }} schema={bridge} onSubmit={data => submit(data, fRef)}>
          <Segment>
            <TextField name='title' />
            <SelectField name='opportunityType' />
            <TextField name='startDate' />
            <TextField name='endDate' />
            <Radio name='recurring' label='Recurring'/>
            <TextField name='description' />
            <SelectField name='category' />
            <TextField name='location' />
            <TextField name='contactName' />
            <TextField name='contactPosition' />
            <TextField name='email' />
            <TextField name='phone' />
            <TextField name='website' />
            <TextField name='coverImage' />
            <TextField name='galleryImage' />
            <SelectField name='ageGroup' />
            <SelectField name='environment' />
            <SubmitField value='Submit' />
            <ErrorsField />
          </Segment>
        </AutoForm>
      </Grid.Column>
    </Grid>
  );
};

export default CreateOpportunity;
