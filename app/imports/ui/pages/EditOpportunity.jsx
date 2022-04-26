import React from 'react';
import { Grid, Loader, Header, Segment, Container, Card, Icon, Form, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm,
  DateField,
  ErrorsField,
  HiddenField,
  LongTextField, NumField,
  SelectField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import ImageUploadFiled from '../components/form-fields/ImageUploadFiled';
import MultiSelectField from '../components/form-fields/MultiSelectField';

const bridge = new SimpleSchema2Bridge(Opportunities._schema);

/** Renders the Page for editing a single document. */
const EditOpportunity = ({ doc, ready }) => {

  // On successful submit, insert the data.
  const submit = (data) => {
    const { title, opportunityType, startDate, endDate, recurring, description, category, location, longitude, latitude, contactName,
      contactPosition, email, phone, website, coverImage, galleryImg1, galleryImg2, galleryImg3,
      galleryImg4, ageGroup, environment, _id } = data;
    const collectionName = Opportunities.getCollectionName();
    const updateData = { id: _id, title, opportunityType, startDate, endDate, recurring, description, category, location, longitude, latitude, contactName, contactPosition, email, phone, website, coverImage, galleryImg1, galleryImg2, galleryImg3,
      galleryImg4, ageGroup, environment };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));
  };

  return (ready) ? (
    <Container id={PAGE_IDS.EDIT_OPPORTUNITY}>
      <div className="organization-sign-up-top">
        <Header as="h2" textAlign="center" inverted>
          Edit Opportunity
        </Header>
        <Header as="h5" textAlign="center" inverted>
          Modify your listing
        </Header>
      </div>
      <br/>
      <br/>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <div className="orgnization-signup-form">
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
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
                <HiddenField name='owner' />
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
  ) : <Loader active>Getting data</Loader>;
};

// Require the presence of a Opportunity document in the props object. Uniforms adds 'model' to the props, which we use.
EditOpportunity.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const documentId = _id;
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Opportunities.findDoc(documentId);
  return {
    doc,
    ready,
  };
})(EditOpportunity);
