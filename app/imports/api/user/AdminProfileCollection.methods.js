import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Accounts } from 'meteor/accounts-base';

export const adminUpdateMethod = new ValidatedMethod({
  name: 'AdminProfileCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ userId, newName }) {
    if (Meteor.isServer) {
      Accounts.setUsername(userId, newName);
    }
  },
});
