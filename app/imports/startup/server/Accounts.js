import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';

/* eslint-disable no-console */

function createUser(email, firstName, lastName, password, role) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    AdminProfiles.define({ email, firstName, lastName, password });
  } else { // everyone else is just a user.
    UserProfiles.define({ email, firstName, lastName, password });
  }
}

function createOrganization(organizationName, username, firstName, lastName, password, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about, email, role) {
  console.log(`  Creating organization ${username} with role ${role}.`);
  if (role === ROLE.ORGANIZATION) {
    OrganizationProfiles.define({ organizationName, username, firstName, lastName, password, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about, email });
  }
}
function createVolunteer(email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType, role) {
  console.log(`  Creating volunteer ${username} with role ${role}.`);
  if (role === ROLE.VOLUNTEER) {
    VolunteerProfiles.define({ email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType });
  }
}
// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role, firstName, lastName }) => createUser(email, firstName, lastName, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
  if (Meteor.settings.defaultOrganizations) {
    console.log('Creating the default organization(s)');
    Meteor.settings.defaultOrganizations.map(({ organizationName,
      username, firstName, lastName, password,
      primaryAddress, city, state, zipCode,
      phoneNumber, fields, environmental,
      about, email, role,
    }) => createOrganization(organizationName, username, firstName, lastName, password, primaryAddress,
      city, state, zipCode, phoneNumber, fields, environmental, about, email, role));
  } else {
    console.log('Cannot initialize the database for organization!  Please invoke meteor with a settings file.');
  }
  if (Meteor.settings.defaultVolunteers) {
    console.log('Creating the default Volunteer(s)');
    Meteor.settings.defaultVolunteers.map(({ email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType, role,
    }) => createVolunteer(email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType, role));
  } else {
    console.log('Cannot initialize the database for organization!  Please invoke meteor with a settings file.');
  }
}
