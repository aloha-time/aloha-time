import React, { useState } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Accounts } from 'meteor/accounts-base';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const AdminSettingsForm = () => {

  const formSchema = new SimpleSchema({
    password: String,
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const [oldPass, setOldPass] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  function match(password1, password2) { // for match the password and confirm password value.
    if (password1 === password2) {
      return true;
    }
    swal('Error!', 'Password and confirm password does not match', 'error');
    return false;
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

  return (
    <div>
      <AutoForm ref={ref => {
        fRef = ref;
      }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <Segment stacked basic>
          <Form.Input required
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
          <Form.Input required
            label="Confirm New Password"
            id={COMPONENT_IDS.ADMIN_NEW_CONFIRM_PASSWORD}
            icon="lock"
            iconPosition="left"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            onChange={handleChange}
          />
          <SubmitField value='Apply Changes' id={COMPONENT_IDS.ADMIN_FORM_SUBMIT}/>
          <ErrorsField />
        </Segment>
      </AutoForm>
    </div>
  );
};

export default AdminSettingsForm;
