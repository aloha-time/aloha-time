import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const opportunityPublications = {
  opportunity: 'Opportunity',
  opportunityVolunteer: 'OpportunityVolunteer',
  opportunityOrganization: 'OpportunityOrganization',
  opportunityAdmin: 'OpportunityAdmin',
};

export const opportunityTypes = [
  'Event',
  'Ongoing',
];

export const opportunityCategories = [
  'Animal Welfare/Rescue',
  'Child/Family Support',
  'COVID-19 Recovery',
  'Crisis/Disaster Relief',
  'Education',
  'Elderly/Senior Care',
  'Environment',
  'Food Insecurity',
  'Homelessness/Poverty',
  'Housing',
  'Ongoing Positions',
  'Special Needs',
];

export const opportunityAges = [
  'Family-Friendly',
  'Teens',
  'Adults',
  'Seniors',
];

export const opportunityEnvironments = [
  'Indoors',
  'Outdoors',
  'Mixed',
  'Virtual',
];

export const opportunityRecurring = [
  'No',
  'Daily',
  'Weekly',
  'Monthly',
  'Yearly',
];

export const opportunityVerify = [
  'Verified',
  'Unverified',
];

class OpportunitiesCollection extends BaseCollection {
  constructor() {
    super('Opportunities', new SimpleSchema({
      title: String,
      opportunityType: {
        type: String,
        allowedValues: opportunityTypes,
        defaultValue: 'Event',
      },
      startDate: Date,
      endDate: Date,
      recurring: {
        type: String,
        allowedValues: opportunityRecurring,
        defaultValue: 'No',
      },
      description: String,
      category: {
        type: Array,
      },
      'category.$': {
        type: String,
        allowedValues: opportunityCategories,
      },
      location: String,
      longitude: Number,
      latitude: Number,
      contactName: String,
      contactPosition: String,
      email: String,
      phone: String,
      website: String,
      coverImage: String,
      galleryImg1: String,
      galleryImg2: String,
      galleryImg3: String,
      galleryImg4: String,
      ageGroup: {
        type: Array,
        required: false,
      },
      'ageGroup.$': {
        type: String,
        allowedValues: opportunityAges,
      },
      environment: {
        type: Array,
      },
      'environment.$': {
        type: String,
        allowedValues: opportunityEnvironments,
      },
      owner: String,
      bookmarks: Number,
      verification: {
        type: String,
        allowedValues: opportunityVerify,
        defaultValue: 'Unverified',
      },
    }));
  }

  /**
   * Defines a new Opportunity item.
   * @param title the title of the opportunity.
   * @param opportunityType the type of the opportunity.
   * @param startDate the start date of the opportunity.
   * @param endDate the end date of the opportunity.
   * @param recurring if the opportunity reoccurs.
   * @param description the description of the opportunity.
   * @param category the category of the opportunity.
   * @param location the location of the opportunity.
   * @param longitude the longitude of the opportunity.
   * @param latitude the latitude of the opportunity.
   * @param contactName the name to contact.
   * @param contactPosition the position of the contact.
   * @param email the email of the contact.
   * @param phone the phone number of the contact.
   * @param website the website of the contact.
   * @param coverImage the cover image for the opportunity.
   * @param galleryImg1 the 1st gallery image for the opportunity.
   * @param galleryImg2 the 2nd gallery image for the opportunity.
   * @param galleryImg3 the 3rd gallery image for the opportunity.
   * @param galleryImg4 the 4th gallery image for the opportunity.
   * @param ageGroup the age group for the opportunity.
   * @param environment the type of environment for the opportunity.
   * @param owner the owner of the item.
   * @return {String} the docID of the new document.
   */
  define({ title, opportunityType, startDate, endDate, recurring, description, category, location, longitude, latitude, contactName,
    contactPosition, email, phone, website, coverImage, galleryImg1, galleryImg2, galleryImg3,
    galleryImg4, ageGroup, environment, owner, bookmarks }) {
    const docID = this._collection.insert({
      title,
      opportunityType,
      startDate,
      endDate,
      recurring,
      description,
      category,
      location,
      longitude,
      latitude,
      contactName,
      contactPosition,
      email,
      phone,
      website,
      coverImage,
      galleryImg1,
      galleryImg2,
      galleryImg3,
      galleryImg4,
      ageGroup,
      environment,
      owner,
      bookmarks,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param title the new title.
   * @param opportunityType the new type.
   * @param startDate the new start date.
   * @param endDate the new end date.
   * @param recurring the new recurring state.
   * @param description the new description.
   * @param category the new category.
   * @param location the new location.
   * @param longitude the new longitude.
   * @param latitude the new latitude.
   * @param contactName the new contact name.
   * @param contactPosition the new contact position.
   * @param email the new contact email.
   * @param phone the new contact phone number.
   * @param website the new contact website.
   * @param coverImage the new cover image.
   * @param galleryImg1 the new gallery images.
   * @param galleryImg2 the new gallery images.
   * @param galleryImg3 the new gallery images.
   * @param galleryImg4 the new gallery images.
   * @param ageGroup the new age group.
   * @param environment the new environment type.
   * @param verification shows if the the given opportunity is verified by the admin
   */
  update(docID, { title, opportunityType, startDate, endDate, recurring, description,
    category, location, longitude, latitude, contactName, contactPosition, email, phone, website, coverImage, galleryImg1, galleryImg2, galleryImg3, galleryImg4, ageGroup, environment, verification, bookmarks }) {
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (opportunityType) {
      updateData.opportunityType = opportunityType;
    }
    if (startDate) {
      updateData.startDate = startDate;
    }
    if (endDate) {
      updateData.endDate = endDate;
    }
    if (recurring) {
      updateData.recurring = recurring;
    }
    if (description) {
      updateData.description = description;
    }
    if (category) {
      updateData.category = category;
    }
    if (location) {
      updateData.location = location;
    }
    if (longitude) {
      updateData.longitude = longitude;
    }
    if (latitude) {
      updateData.latitude = latitude;
    }
    if (contactName) {
      updateData.contactName = contactName;
    }
    if (contactPosition) {
      updateData.contactPosition = contactPosition;
    }
    if (email) {
      updateData.email = email;
    }
    if (phone) {
      updateData.phone = phone;
    }
    if (website) {
      updateData.website = website;
    }
    if (coverImage) {
      updateData.coverImage = coverImage;
    }
    if (galleryImg1) {
      updateData.galleryImg1 = galleryImg1;
    }
    if (galleryImg2) {
      updateData.galleryImg2 = galleryImg2;
    }
    if (galleryImg3) {
      updateData.galleryImg3 = galleryImg3;
    }
    if (galleryImg4) {
      updateData.galleryImg4 = galleryImg4;
    }
    if (ageGroup) {
      updateData.ageGroup = ageGroup;
    }
    if (environment) {
      updateData.environment = environment;
    }
    if (verification) {
      updateData.verification = verification;
    }
    if (bookmarks) {
      updateData.bookmarks = bookmarks;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } title A document or docID in this collection.
   * @returns true
   */
  removeIt(title) {
    const doc = this.findDoc(title);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the opportunity associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the OpportunitiesCollection instance.
      const instance = this;

      /** This subscription publishes all documents regardless of Roles. */
      Meteor.publish(opportunityPublications.opportunity, function publish() {
        if (Meteor.isServer) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(opportunityPublications.opportunityVolunteer, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.VOLUNTEER)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes only the documents associated with the logged in Organization role. */
      Meteor.publish(opportunityPublications.opportunityOrganization, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ORGANIZATION)) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(opportunityPublications.opportunityAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for opportunity owned by the current user.
   */
  subscribeOpportunity() {
    if (Meteor.isClient) {
      return Meteor.subscribe(opportunityPublications.opportunity);
    }
    return null;
  }

  /**
   * Subscription method for opportunity owned by the organization user.
   */
  subscribeOpportunityOrganization() {
    if (Meteor.isClient) {
      return Meteor.subscribe(opportunityPublications.opportunityOrganization);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOpportunityAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(opportunityPublications.opportunityAdmin);
    }
    return null;
  }

  getOpportunity(id) {
    const opportunities = this._collection.find().fetch();
    const final = opportunities.filter(opportunity => opportunity._id === id);
    return final[0];
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.VOLUNTEER, ROLE.ORGANIZATION]); // edit this later to assert proper roles
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), environment: *, ageGroup: *, galleryImg4: *, galleryImg3: *, galleryImg2: *,
   * galleryImg1: *, coverImage: *,
   * website: *, contactPosition: *, contactName: *, latitude: *, longitude: *, location: *, category: *, description: *, recurring: *, endTime: *,
   * startTime: *, endDate: *, startDate: *, opportunityType: *, title}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const title = doc.title;
    const opportunityType = doc.opportunityType;
    const startDate = doc.startDate;
    const endDate = doc.endDate;
    const recurring = doc.recurring;
    const description = doc.description;
    const category = doc.category;
    const location = doc.location;
    const longitude = doc.longitude;
    const latitude = doc.latitude;
    const contactName = doc.contactName;
    const contactPosition = doc.contactPosition;
    const email = doc.email;
    const phone = doc.phone;
    const website = doc.website;
    const coverImage = doc.coverImage;
    const galleryImg1 = doc.galleryImg1;
    const galleryImg2 = doc.galleryImg2;
    const galleryImg3 = doc.galleryImg3;
    const galleryImg4 = doc.galleryImg4;
    const ageGroup = doc.ageGroup;
    const environment = doc.environment;
    const owner = doc.owner;
    const bookmarks = doc.bookmarks;
    return { title, opportunityType, startDate, endDate, recurring, description, category, location, longitude, latitude, contactName,
      contactPosition, email, phone, website, coverImage, galleryImg1, galleryImg2, galleryImg3,
      galleryImg4, ageGroup, environment, owner, bookmarks };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Opportunities = new OpportunitiesCollection();
