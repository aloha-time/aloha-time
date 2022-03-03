import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { OrganizationProfiles } from './OrganizationProfileCollection';

export const signUpNewOrganizationMethod = new ValidatedMethod({
  name: 'OrganizationProfiles.SignupNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ username, organizationName, firstName, lastName, password, image, email, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about }) {
    if (Meteor.isServer) {
      OrganizationProfiles.define({ username, organizationName, firstName, lastName, password, image, email, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about });
    }
  },
});
