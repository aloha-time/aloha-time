import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const opportunityPublications = {
  opportunity: 'Opportunity',
  opportunityAdmin: 'OpportunityAdmin',
};
export const opportunityTypes = ['event', 'ongoing'];
export const opportunityCategories = ['Animal Welfare/Rescue', 'Child/Family Support', 'COVID-19 Recovery',
  'Crisis/Disaster Relief', 'Education', 'Elderly/Senior Care', 'Environment', 'Food Insecurity',
  'Homelessness/Poverty', 'Housing', 'Ongoing Positions', 'Special Needs'];
export const opportunityAges = ['family-friendly', 'teens', 'adults', 'seniors'];
export const opportunityEnvironments = ['indoors', 'outdoors', 'mixed', 'virtual'];

class OpportunitiesCollection extends BaseCollection {
  constructor() {
    super('Opportunities', new SimpleSchema({
      title: String,
      oppType: {
        type: String,
        allowedValues: opportunityTypes,
        defaultValue: 'event',
      },
      startDate: String,
      endDate: String,
      recurring: Boolean,
      description: String,
      category: {
        type: String,
        allowedValues: opportunityCategories,
      },
      location: String,
      contactName: String,
      contactPosition: String,
      email: String,
      phone: String,
      website: String,
      coverImage: String,
      galleryImage: String,
      ageGroup: {
        type: String,
        allowedValues: opportunityAges,
      },
      environment: {
        type: String,
        allowedValues: opportunityEnvironments,
      },
      owner: String,
    }));
  }

  /**
   * Defines a new Opportunity item.
   * @param title the title of the opportunity.
   * @param oppType the type of the opportunity.
   * @param startDate the start date of the opportunity.
   * @param endDate the end date of the opportunity.
   * @param recurring if the opportunity reoccurs.
   * @param description the description of the opportunity.
   * @param category the category of the opportunity.
   * @param location the location of the opportunity.
   * @param contactName the name to contact.
   * @param contactPosition the position of the contact.
   * @param email the email of the contact.
   * @param phone the phone number of the contact.
   * @param website the website of the contact.
   * @param coverImage the cover image for the opportunity.
   * @param galleryImage the gallery images for the opportunity.
   * @param ageGroup the age group for the opportunity.
   * @param environment the type of environment for the opportunity.
   * @param owner the owner of the item.
   * @return {String} the docID of the new document.
   */
  define({ title, oppType, startDate, endDate, recurring, description, category, location, contactName, contactPosition, email, phone, website, coverImage, galleryImage, ageGroup, environment, owner }) {
    const docID = this._collection.insert({
      title,
      oppType,
      startDate,
      endDate,
      recurring,
      description,
      category,
      location,
      contactName,
      contactPosition,
      email,
      phone,
      website,
      coverImage,
      galleryImage,
      ageGroup,
      environment,
      owner,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param title the new title.
   * @param oppType the new type.
   * @param startDate the new start date.
   * @param endDate the new end date.
   * @param recurring the new recurring state.
   * @param description the new description.
   * @param category the new category.
   * @param location the new location.
   * @param contactName the new contact name.
   * @param contactPosition the new contact position.
   * @param email the new contact email.
   * @param phone the new contact phone number.
   * @param website the new contact website.
   * @param coverImage the new cover image.
   * @param galleryImage the new gallery images.
   * @param ageGroup the new age group.
   * @param environment the new environment type.
   */
  update(docID, { title, oppType, startDate, endDate, recurring, description, category, location, contactName, contactPosition, email, phone, website, coverImage, galleryImage, ageGroup, environment }) {
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (oppType) {
      updateData.oppType = oppType;
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
    if (galleryImage) {
      updateData.galleryImage = galleryImage;
    }
    if (ageGroup) {
      updateData.ageGroup = ageGroup;
    }
    if (environment) {
      updateData.environment = environment;
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
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(opportunityPublications.opportunity, function publish() {
        if (this.userId) {
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
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOpportunityAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(opportunityPublications.opportunityAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), environment: *, ageGroup: *, galleryImage: *, coverImage: *, galleryImage: *,
   * website: *, contactPosition: *, contactName: *, location: *,category: *, description: *, recurring: *, endDate: *,
   * startDate: *, oppType: *, title}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const title = doc.title;
    const oppType = doc.oppType;
    const startDate = doc.startDate;
    const endDate = doc.endDate;
    const recurring = doc.recurring;
    const description = doc.description;
    const category = doc.category;
    const location = doc.location;
    const contactName = doc.contactName;
    const contactPosition = doc.contactPosition;
    const email = doc.email;
    const phone = doc.phone;
    const website = doc.website;
    const coverImage = doc.coverImage;
    const galleryImage = doc.galleryImage;
    const ageGroup = doc.ageGroup;
    const environment = doc.environment;
    const owner = doc.owner;
    return { title, oppType, startDate, endDate, recurring, description, category, location, contactName, contactPosition, email, phone, website, coverImage, galleryImage, ageGroup, environment, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Opportunities = new OpportunitiesCollection();
