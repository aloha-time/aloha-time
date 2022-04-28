import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { VolunteerBookmarks } from './VolunteerBookmarkCollection';

export const volunteerBookmarkDefineMethod = new ValidatedMethod({
  name: 'VolunteerBookmarkCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      const docID = VolunteerBookmarks.define(definitionData);
      return docID;
    }
    return '';
  },
});

export const volunteerBookmarkRemoveItMethod = new ValidatedMethod({
  name: 'VolunteerBookmarkCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return VolunteerBookmarks.removeIt(instance);
  },
});
