import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Opportunities } from './OpportunitiesCollection';

export const removeItMethod = new ValidatedMethod({
  name: 'OpportunitiesCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ instance }) {
    if (Meteor.isServer) {
      Opportunities.removeIt(instance._id);
    }
  },
});

export const updateMethod = new ValidatedMethod({
  name: 'OpportunitiesCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ updateData }) {
    if (Meteor.isServer) {
      Opportunities.update(updateData.id, updateData);
    }
  },
});

export const updateBookmarkMethod = new ValidatedMethod({
  name: 'OpportunitiesCollection.updateBookmark',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    if (Meteor.isServer) {
      Opportunities.update(updateData._id, updateData);
    }
  },
});
