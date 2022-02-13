import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { OrganizationProfiles } from './OrganizationProfileCollection';

export const signUpNewOrganizationMethod = new ValidatedMethod({
  name: 'OrganizationProfiles.SignupNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ username, firstName, lastName, password, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about, email }) {
    if (Meteor.isServer) {
      OrganizationProfiles.define({ username, firstName, lastName, password, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about, email });
    }
  },
});
