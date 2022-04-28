import React from 'react';
import { Grid, Header, Card, Container, Segment, Form, Icon, Button } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  LongTextField,
  SelectField,
  SubmitField,
  TextField,
  DateField,
  NumField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { NavLink } from 'react-router-dom';
import {
  Opportunities,
  opportunityAges,
  opportunityCategories, opportunityEnvironments, opportunityRecurring,
  opportunityTypes,
} from '../../api/opportunity/OpportunitiesCollection';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import ImageUploadFiled from '../components/form-fields/ImageUploadFiled';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  opportunityType: {
    type: String,
    allowedValues: opportunityTypes,
    defaultValue: 'Event',
  },
  startDate: Date,
  endDate: String,
  recurring: {
    type: String,
    allowedValues: opportunityRecurring,
    defaultValue: 'No',
  },
  description: String,
  category: {
    type: Array,
  },
  'category.$': {
    type: String,
    allowedValues: opportunityCategories,
  },
  location: String,
  longitude: Number,
  latitude: Number,
  contactName: String,
  contactPosition: String,
  email: String,
  phone: String,
  website: String,
  coverImage: {
    type: String,
    defaultValue: '../images/opportunity_images/defaults/defaultCoverImg.jpg',
  },
  galleryImg1: {
    type: String,
    defaultValue: '../images/opportunity_images/defaults/defaultGalleryImg.jpg',
  },
  galleryImg2: {
    type: String,
    defaultValue: '../images/opportunity_images/defaults/defaultGalleryImg.jpg',
  },
  galleryImg3: {
    type: String,
    defaultValue: '../images/opportunity_images/defaults/defaultGalleryImg.jpg',
  },
  galleryImg4: {
    type: String,
    defaultValue: '../images/opportunity_images/defaults/defaultGalleryImg.jpg',
  },
  ageGroup: {
    type: Array,
    required: false,
  },
  'ageGroup.$': {
    type: String,
    allowedValues: opportunityAges,
  },
  environment: {
    type: Array,
  },
  'environment.$': {
    type: String,
    allowedValues: opportunityEnvironments,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
const AddOpportunity = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, opportunityType, startDate, endDate, recurring, description, category, location, longitude, latitude, contactName,
      contactPosition, email, phone, website, coverImage, galleryImg1, galleryImg2, galleryImg3,
      galleryImg4, ageGroup, environment } = data;
    const owner = Meteor.user().username;
    const collectionName = Opportunities.getCollectionName();
    const definitionData = { title, opportunityType, startDate, endDate, recurring, description, category, location, longitude, latitude,
      contactName, contactPosition, email, phone, website, coverImage, galleryImg1, galleryImg2,
      galleryImg3, galleryImg4, ageGroup, environment, owner };
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
    <Container id={PAGE_IDS.ADD_OPPORTUNITY}>
      <div className="organization-sign-up-top">
        <Header as="h2" textAlign="center" inverted>
            Add Opportunity
        </Header>
        <Header as="h5" textAlign="center" inverted>
            Your new listing details
        </Header>
      </div>
      <br/>
      <br/>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <div className="orgnization-signup-form">
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Segment stacked basic>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                        General
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <SelectField checkboxes label='Opportunity Type' name='opportunityType'/>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                        Volunteer Opportunity Information
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <TextField label='Title' name='title' placeholder='Title'/>
                  </Card.Content>
                  <Card.Content>
                    <Form.Group widths='equal'>
                      <DateField name='startDate'/>
                      <DateField name='endDate'/>
                    </Form.Group>
                    <SelectField label='Is recurring?' name='recurring'/>
                  </Card.Content>
                  <Card.Content>
                    <LongTextField label='Description' name='description' placeholder='Please enter a detailed
                    description of the volunteer opportunity.'/>
                    <MultiSelectField checkboxes label='Category' name='category'/>
                    <TextField label='Location' name='location' placeholder='e.g. "Honolulu"'/>
                    <NumField label='Longitude' name='longitude' placeholder='-157.818694'/>
                    <NumField label='Latitude' name='latitude' placeholder='21.29828'/>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                        Contact Information
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <TextField label='Primary Contact Name' name='contactName' placeholder='First Last'/>
                    <TextField label='Primary Contact Position' name='contactPosition' placeholder='Contact Position'/>
                    <TextField label='Email' name='email' placeholder='Email'/>
                    <TextField label='Phone' name='phone' placeholder='( ___ ) - ___ - ____'/>
                    <TextField label='Website' name='website' placeholder='URL to your website'/>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                        Additional information
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <ImageUploadFiled label='Cover Image' name='coverImage' />
                    <ImageUploadFiled label='Gallery Image 1' name='galleryImg1'/>
                    <ImageUploadFiled label='Gallery Image 2' name='galleryImg2'/>
                    <ImageUploadFiled label='Gallery Image 3' name='galleryImg3'/>
                    <ImageUploadFiled label='Gallery Image 4' name='galleryImg4'/>
                    <MultiSelectField checkboxes label='Age Group' name='ageGroup'/>
                    <MultiSelectField checkboxes label='Environment' name='environment'/>
                  </Card.Content>
                </Card>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
            <Grid columns={3}>
              <Grid.Row/>
              <Grid.Row>
                <Grid.Column/>
                <Grid.Column>
                  <Button fluid color='blue' as={NavLink} exact to="/browse-opportunities">
                      View Opportunities
                  </Button>
                </Grid.Column>
                <Grid.Column/>
              </Grid.Row>
              <Grid.Row/>
            </Grid>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default AddOpportunity;
