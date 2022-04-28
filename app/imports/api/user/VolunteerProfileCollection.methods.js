import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Accounts } from 'meteor/accounts-base';
import { VolunteerProfiles } from './VolunteerProfileCollection';

export const signUpNewVolunteerMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.SignUpNewVolunteer',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType, image }) {
    if (Meteor.isServer) {
      VolunteerProfiles.define({ email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType, image });
    }
  },
});
export const VolunteerUpdateMethod = new ValidatedMethod({
  name: 'VolunteerProfileCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ DocId, userId, newName }) {
    if (Meteor.isServer) {
      Accounts.setUsername(userId, newName);
      VolunteerProfiles.update(DocId, { username: newName });
    }
  },
});
