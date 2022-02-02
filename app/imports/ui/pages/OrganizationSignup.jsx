import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationCollection';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const Signup = ({ location }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryAddress, setPrimaryAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fields, setFields] = useState([]);// for initial fields to be a array
  const [environmental, setEnvironmental] = useState('');
  const [about, setAbout] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  function match(password1, password2) { // for match the password and confirm password value.
    if (password1 === password2) {
      return true;
    }
    setError(
      'Password and confirm password does not match.',
    );
    swal('Error!', 'Password and confirm password does not match', 'error');

    return false;
  }

  function checkedPrivacyPolicy(value) { // for user to agree the policy befor sign up
    if (value !== 'true') {
      setError(
        'please to agree our privacy policy, thank you:) ',
      );
      swal('Error!', 'please to agree our privacy policy, thank you', 'error');
      return false;
    }
    return value;
  }
  function checkedList(filedsArray, value) {
    const indexOfValule = filedsArray.indexOf(value);
    if (indexOfValule >= 0) {
      filedsArray.splice(indexOfValule, 1);
    } else {
      filedsArray.push(value);
    }
    return filedsArray;
  }
  // Update the form controls each time the user interacts with them.
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    case 'confirmPassword':
      setConfirmPassword(value);
      break;
    case 'userName':
      setUsername(value);
      break;
    case 'firstName':
      setFirstName(value);
      break;
    case 'lastName':
      setLastName(value);
      break;
    case 'primaryAddress':
      setPrimaryAddress(value);
      break;
    case 'city':
      setCity(value);
      break;
    case 'state':
      setState(value);
      break;
    case 'zipCode':
      setZipCode(value);
      break;
    case 'phoneNumber':
      setPhoneNumber(value);
      break;
    case 'fields':
      setFields(checkedList(fields, value));
      break;
    case 'environmental':
      setEnvironmental(value);
      break;
    case 'about':
      setAbout(value);
      break;
    case 'privacyPolicy':
      setPrivacyPolicy(value);
      break;
    default:
      // do nothing.
    }
  };

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = () => {
    if (match(password, confirmPassword) && checkedPrivacyPolicy(privacyPolicy)) {
      Accounts.createUser({ email, username, password }, (err) => {
        if (err) {
          setError(err.reason);
        } else {
          const owner = Meteor.user().owner;

          const definitionData = { firstName, lastName, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about, owner };
          OrganizationProfiles.define(definitionData);
          setError('');
          setRedirectToReferer(true);
        }
      });
    } else {
      setError('please fix the errors');
      // eslint-disable-next-line no-undef
    }
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }
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
          <div className="orgnization-signup-form">
            <Form onSubmit={submit}>
              <Segment stacked basic>
                <Form.Input required
                  label="First Name"
                  id={COMPONENT_IDS.SIGN_UP_FORM_FIRSTNAME}
                  name="firstName"
                  type="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />
                <Form.Input required
                  label="Last Name"
                  id={COMPONENT_IDS.SIGN_UP_FORM_LASTNAME}
                  name="lastName"
                  type="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
                <Form.Input required
                  label="E-mail Address"
                  id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={handleChange}
                />
                <Form.Input required
                  label="Primary Address"
                  id={COMPONENT_IDS.SIGN_UP_FORM_PRIMARY_ADDRESS}
                  name="primaryAddress"
                  placeholder="Primary Address"
                  type="Address"
                  onChange={handleChange}
                />
                <Form.Group widths='equal'>
                  <Form.Input fluid label='City' name= "city" placeholder='City' onChange={handleChange} required />
                  <Form.Input fluid label='State' name = "state" placeholder='State' onChange={handleChange} required />
                  <Form.Input fluid label='Zip/Postal Code' name = "zipCode" placeholder='Zip Code' onChange={handleChange} required/>
                </Form.Group>
                <Form.Input
                  label="Phone Number"
                  id={COMPONENT_IDS.SIGN_UP_FORM_PHONE_NUMBER}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
                <br/>

                <Form.Input required
                  label="Username"
                  id={COMPONENT_IDS.SIGN_UP_FORM_USERNAME}
                  name="username"
                  placeholder="Username"
                  icon="user"
                  iconPosition="left"
                  type="name"
                  onChange={handleChange}
                />
                <Form.Input required
                  label="Password"
                  id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={handleChange}
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
                <Header as="h5">
                  Fields
                </Header>
                <Form.Group>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Animal Welfare/Rescue'
                          value='Animal Welfare/Rescue'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Child/Family Support'
                          value='Child/Family Support'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <Form.Checkbox
                          label='COVID-19 Recovery'
                          value='COVID-19 Recovery'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Crisis/Disaster Relief'
                          value='Crisis/Disaster Relief'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Education'
                          value='Education'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Environment'
                          value='Environment'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Elderly/Senior Care'
                          value='Elderly/Senior Care'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Food Banks'
                          value='Food Banks'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Housing'
                          value='Housing'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Homelessness/Poverty'
                          value='Homelessness/Poverty'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Checkbox
                          label='Special Needs'
                          value='Special Needs'
                          name="fields"
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form.Group>
                <Header as="h5">
                  Environmental
                </Header>
                <Form.Group>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Checkbox radio
                          label='Indoor'
                          value= "Indoor"
                          name="environmental"
                          checked={environmental === 'Indoor'}
                          onChange={handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Checkbox radio
                          label='Outdoor'
                          value= "Outdoor"
                          name="environmental"
                          checked={environmental === 'Outdoor'}
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Checkbox radio
                          label='Both'
                          name="environmental"
                          value= "Both"
                          checked={environmental === 'Both'}
                          onChange={handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Checkbox radio
                          name="environmental"
                          label='No Preference'
                          value= "No Preference"
                          checked={environmental === 'No Preference'}
                          onChange={handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form.Group>
                <Form.TextArea label='About' name="about" default value = 'None!!!' placeholder='Describe more information about your organization!!!' onChange={handleChange} />
                <h5>Show privacy policy</h5>
                <Form.Checkbox required
                  label = "Please confirm that you agree to our privacy policy"
                  name="privacyPolicy"
                  value="true"
                  onChange={handleChange}
                />

                <br/>
                <Form.Button fluid color= "blue" id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} content="Register" />
              </Segment>
            </Form>
          </div>
          <Message>
            Already have an account? Login <Link to="/signin">here</Link>
          </Message>
          {error === '' ? (
            ''
          ) : (
            <Message
              error
              header="Registration was not successful"
              content={error}
            />
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
