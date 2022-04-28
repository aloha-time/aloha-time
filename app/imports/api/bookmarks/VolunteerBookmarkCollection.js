import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const volunteerBookmarksPublications = {
  volunteerBookmark: 'VolunteerBookmark',
  volunteerBookmarkCommunity: 'VolunteerBookmarkCommunity',
};

class VolunteerBookmarkCollection extends BaseCollection {
  constructor() {
    super('VolunteerBookmarks', new SimpleSchema({
      // this is a volunteer
      bookmarkOwner: String,
      opportunityOwner: String,
      opportunityID: String,
    }));
  }

  define({ bookmarkOwner, opportunityOwner, opportunityID }) {
    const docID = this._collection.insert({
      bookmarkOwner,
      opportunityOwner,
      opportunityID,
    });
    return docID;
  }

  removeIt(_id) {
    const doc = this.findDoc(_id);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(volunteerBookmarksPublications.volunteerBookmark, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ bookmarkOwner: username });
        }
        return this.ready();
      });

      Meteor.publish(volunteerBookmarksPublications.volunteerBookmarkCommunity, function publish() {
        return instance._collection.find();
      });
    }
  }

  subscribeVolunteerBookmark() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerBookmarksPublications.volunteerBookmark);
    }
    return null;
  }

  subscribeVolunteerBookmarkCommunity() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerBookmarksPublications.volunteerBookmarkCommunity);
    }
    return null;
  }

  // Get the opportunities that a specific volunteer bookmarked
  getVolunteerBookmark(username) {
    return this._collection.find({ bookmarkOwner: username }, {}).fetch();
    // return this._collection.find().fetch();
  }

  // Gets the opportunities of all volunteers that bookmarked any opportunity
  getAllBookmark() {
    return this._collection.find().fetch();
  }

  // get all Volunteers that bookmarked a certain opportunity
  getOpportunityBookmarks(id) {
    const bookmarks = this.getAllBookmark();
    const opportunities = bookmarks.filter(opportunity => opportunity._id === id);
    return opportunities.map(opportunity => opportunity.owner);
  }
}

export const VolunteerBookmarks = new VolunteerBookmarkCollection();
