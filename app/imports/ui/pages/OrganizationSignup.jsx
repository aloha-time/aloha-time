import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Grid, Header, Message, Segment, Form } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { signUpNewOrganizationMethod } from '../../api/user/OrganizationProfileCollection.methods';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import RadioField from '../components/form-fields/RadioField';
import ImageUploadFiled from '../components/form-fields/ImageUploadFiled';

export const fieldsType = [
  'Animal Welfare/Rescue',
  'Child/Family Support',
  'COVID-19 Recovery',
  'Crisis/Disaster Relief',
  'Education',
  'Environment',
  'Elderly/Senior Care',
  'Food Banks',
  'Housing',
  'Homelessness/Poverty',
  'Special Needs',
];
export const environmentalType = ['Indoor', 'Outdoor', 'Both', 'No Preference'];
const formSchema = new SimpleSchema({
  organizationName: String,
  image: String,
  websiteLink: String,
  firstName: String,
  username: String,
  password: String,
  lastName: String,
  email: String,
  primaryAddress: String,
  city: String,
  state: String,
  zipCode: String,
  phoneNumber: String,
  fields: { type: Array, required: false },
  'fields.$': { type: String, allowedValues: fieldsType, required: false },
  environmental: { type: String, allowedValues: environmentalType, required: false },
  about: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const OrganizationSignup = ({ location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  function match(password1, password2) { // for match the password and confirm password value.
    if (password1 === password2) {
      return true;
    }
    swal('Error!', 'Password and confirm password does not match', 'error');
    return false;
  }

  function checkedPrivacyPolicy(value) { // for user to agree the policy befor sign up
    if (value !== 'true') {
      swal('Error!', 'please to agree our privacy policy, thank you', 'error');
      return false;
    }
    return value;
  }
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'confirmPassword':
      setConfirmPassword(value);
      break;
    case 'privacyPolicy':
      setPrivacyPolicy(value);
      break;
    default:
      // do nothing.
    }
  };
  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (data, formRef) => {
    if (match(data.password, confirmPassword) && checkedPrivacyPolicy(privacyPolicy)) {
      signUpNewOrganizationMethod.callPromise(data)
        .catch(error => {
          const message = `${error.message}, you already have a account, so you can try to login in`;
          swal('Error', message, 'error');
          console.error(error);
        });
      formRef.reset();
      swal({
        title: 'Signed Up',
        text: 'You now have an account. Next you need to login.',
        icon: 'success',
      });
      setRedirectToReferer(true);
    } else {
      // do nothing
    }
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/signin' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  let fRef = null;
  return (
    <Container id={PAGE_IDS.ORGANIZATION_SIGN_UP}>
      <div className="organization-sign-up-top">
        <Header as="h2" textAlign="center" inverted>
        Organization Sign Up
        </Header>
        <Header as="h5" textAlign="center" inverted>
        Sign up to be a organization
        </Header>
      </div>
      <br/>
      <br/>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment stacked basic>
              <TextField
                id={COMPONENT_IDS.SIGN_UP_FORM_ORGANIZATION_NAME}
                name="organizationName"
                placeholder="Organization Name"
              />
              <ImageUploadFiled label='Organization Image' name='image'/>
              <TextField
                id={COMPONENT_IDS.SIGN_UP_FORM_ORGANIZATION_WEBSITE}
                name="websiteLink"
                placeholder="Website"
              />
              <TextField
                id={COMPONENT_IDS.SIGN_UP_FORM_FIRSTNAME}
                name="firstName"
                placeholder="Contact First Name"
              />
              <TextField
                id={COMPONENT_IDS.SIGN_UP_FORM_LASTNAME}
                name="lastName"
                placeholder="Contact Last Name"
              />
              <TextField
                id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}
                name="email"
                placeholder="E-mail address"
              />
              <TextField
                id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}
                name="organizationName"
                placeholder="Organization name"
              />
              <TextField
                id={COMPONENT_IDS.SIGN_UP_FORM_PRIMARY_ADDRESS}
                name="primaryAddress"
                placeholder="Primary Address"
              />
              <Form.Group widths='equal'>
                <TextField label='City' name= "city" placeholder='City'/>
                <TextField label='State' name = "state" placeholder='State' />
              </Form.Group>
              <TextField label='Zip/Postal Code' name = "zipCode" placeholder='Zip Code'/>
              <TextField
                label="Phone Number"
                id={COMPONENT_IDS.SIGN_UP_FORM_PHONE_NUMBER}
                name="phoneNumber"
                placeholder="Phone Number"
              />
              <br/>
              <TextField
                id={COMPONENT_IDS.SIGN_UP_FORM_USERNAME}
                name="username"
                placeholder="Username"
              />
              <TextField
                type='password'
                id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}
                name="password"
                placeholder="Password"
              />
              <Form.Input required
                label="Confirm Password"
                id={COMPONENT_IDS.SIGN_UP_FORM_CONFIRM_PASSWORD}
                icon="lock"
                iconPosition="left"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                onChange={handleChange}
              />
              <MultiSelectField name='fields'/>
              <RadioField name='environmental'/>
              <TextField name='about'/>
              <Form.Checkbox required
                label = "Please confirm that you agree to our privacy policy"
                name="privacyPolicy"
                value="true"
                onChange={handleChange}
              />
              <SubmitField value='Sign up' id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT}/>
              <ErrorsField />
            </Segment>
          </AutoForm>
          <Message>
            Already have an account? Login <Link to="/signin">here</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
OrganizationSignup.propTypes = {
  location: PropTypes.object,
};

export default OrganizationSignup;
