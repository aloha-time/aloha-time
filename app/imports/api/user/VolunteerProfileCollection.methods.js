import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { VolunteerProfiles } from './VolunteerProfileCollection';

export const signUpNewVolunteerMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.SignUpNewVolunteer',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType }) {
    if (Meteor.isServer) {
      VolunteerProfiles.define({ email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType });
    }
  },
});