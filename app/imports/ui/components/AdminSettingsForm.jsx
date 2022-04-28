import React, { useState } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { adminUpdateMethod } from '../../api/user/AdminProfileCollection.methods';

const AdminSettingsForm = () => {

  const formSchema = new SimpleSchema({
    password: String,
  });

  const formSchema2 = new SimpleSchema({
    username: String,
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const bridge2 = new SimpleSchema2Bridge(formSchema2);

  const [oldPass, setOldPass] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  function match(password1, password2) { // for match the password and confirm password value.
    if (password1 === password2) {
      return true;
    }
    swal('Error!', 'Password and confirm password does not match', 'error');
    return false;
  }

  function match2(username1, username2) {
    if (username1 === username2) {
      return false;
    }
    return true;
  }

  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'confirmPassword':
      setConfirmPassword(value);
      break;
    case 'oldPassword':
      setOldPass(value);
      break;
    default:
          // do nothing.
    }
  };

  const submit2 = (data2, formRef2) => {
    const result = Meteor.user({ fields: { username: 1 } }).username;
    if (match2(data2.username, result)) {
      adminUpdateMethod.callPromise({ userId: Meteor.userId(), newName: data2.username }).catch(error => swal('Error', error.message, 'error'));
      formRef2.reset();
      swal({
        title: 'Changed Applied!',
        text: 'You have successfully changed your username!',
        icon: 'success',
      });
    } else {
      swal('Error!', 'Same username!', 'error');
    }
  };

  const submit = (data, formRef) => {
    if (match(data.password, confirmPassword)) {
      Accounts.changePassword(oldPass, confirmPassword, (error) => {
        if (typeof error === 'undefined') {
          formRef.reset();
          swal({
            title: 'Changed Applied!',
            text: 'You have successfully changed your password!',
            icon: 'success',
          });
          return true;
        }
        if (error) {
          swal({
            title: 'Change Failure!',
            text: `You have unsuccessfully changed your password - ${error.reason}`,
            icon: 'error',
          });
          return false;
        }
        return undefined;
      });
    } else {
    // do nothing
    }
  };

  let fRef = null;

  let fRef2 = null;

  return (
    <div>
      <AutoForm ref={ref2 => {
        fRef2 = ref2;
      }} schema={bridge2} onSubmit={data2 => submit2(data2, fRef2)}>
        <Segment basic>
          <TextField
            type='text'
            label='Change Username'
            name='username'
            placeholder='New Username'
            id={COMPONENT_IDS.ADMIN_USERNAME}
          />
        </Segment>
        <SubmitField value='Change Username' id={COMPONENT_IDS.ADMIN_USERNAME_FORM_SUBMIT}/>
        <ErrorsField />
      </AutoForm>
      <AutoForm ref={ref => {
        fRef = ref;
      }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <Segment stacked basic>
          <Form.Input
            type='password'
            label='Old Password'
            id={COMPONENT_IDS.ADMIN_OLD_PASSWORD}
            name='oldPassword'
            placeholder='Old Password'
            onChange={handleChange}
          />
          <TextField
            label='New Password'
            type='password'
            id={COMPONENT_IDS.ADMIN_NEW_PASSWORD}
            name="password"
            placeholder="Password"
          />
          <Form.Input
            label="Confirm New Password"
            id={COMPONENT_IDS.ADMIN_NEW_CONFIRM_PASSWORD}
            icon="lock"
            iconPosition="left"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            onChange={handleChange}
          />
        </Segment>
        <SubmitField value='Change Password' id={COMPONENT_IDS.ADMIN_FORM_SUBMIT}/>
        <ErrorsField />
      </AutoForm>
    </div>
  );
};

export default AdminSettingsForm;
