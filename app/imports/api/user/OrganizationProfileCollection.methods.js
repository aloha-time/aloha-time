import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Accounts } from 'meteor/accounts-base';
import { OrganizationProfiles } from './OrganizationProfileCollection';

export const signUpNewOrganizationMethod = new ValidatedMethod({
  name: 'OrganizationProfiles.SignupNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ username, organizationName, websiteLink, firstName, lastName, password, image, email, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about }) {
    if (Meteor.isServer) {
      OrganizationProfiles.define({ username, organizationName, websiteLink, firstName, lastName, password, image, email, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about });
    }
  },
});

export const orgRemoveItMethod = new ValidatedMethod({
  name: 'OrganizationProfile.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ instance }) {
    if (Meteor.isServer) {
      OrganizationProfiles.removeIt(instance._id);
    }
  },
});
export const OrganizationUpdateMethod = new ValidatedMethod({
  name: 'OrganizationProfileCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ DocId, userId, newName }) {
    if (Meteor.isServer) {
      Accounts.setUsername(userId, newName);
      OrganizationProfiles.update(DocId, { username: newName });
    }
  },
});
