import { Card, Icon, Segment } from 'semantic-ui-react';
import { ErrorsField, SubmitField } from 'uniforms-semantic';
import React from 'react';
import ImageUploadFiled from './form-fields/ImageUploadFiled';

const UploadImages = () => (
  <Segment stacked basic>
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Icon name='pencil alternate'/>
            Memories
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <ImageUploadFiled label='Image 1' name='galleryImg1'/>
      </Card.Content>
      <Card.Content>
        <ImageUploadFiled label='Image 2' name='galleryImg2'/>
      </Card.Content>
      <Card.Content>
        <ImageUploadFiled label='Image 3' name='galleryImg3'/>
      </Card.Content>
      <Card.Content>
        <ImageUploadFiled label='Image 4' name='galleryImg4'/>
      </Card.Content>
      <Card.Content>
        <ImageUploadFiled label='Image 5' name='galleryImg5'/>
      </Card.Content>
      <Card.Content>
        <ImageUploadFiled label='Image 6' name='galleryImg6'/>
      </Card.Content>
    </Card>
    <SubmitField value='Submit'/>
    <ErrorsField/>
  </Segment>
);
export default UploadImages;
