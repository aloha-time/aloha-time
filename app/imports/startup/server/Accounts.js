import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';

/* eslint-disable no-console */

function createUser(username, firstName, lastName, password, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about, email, role) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    AdminProfiles.define({ email, firstName, lastName, password });
  } else if (role === ROLE.ORGANIZATION) {
    OrganizationProfiles.define({ username, firstName, lastName, password, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about, email });
  } else { // everyone else is just a user.
    UserProfiles.define({ email, firstName, lastName, password });
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ username, firstName, lastName,
      password, primaryAddress, city, state, zipCode,
      phoneNumber, fields, environmental, about, email, role }) => createUser(username, firstName, lastName, password, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about, email, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
