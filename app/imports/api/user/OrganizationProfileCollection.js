import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

export const fieldsType = [
  'Animal Welfare/Rescue',
  'Child/Family Support',
  'COVID-19 Recovery',
  'Crisis/Disaster Relief',
  'Education',
  'Environment',
  'Elderly/Senior Care',
  'Food Banks',
  'Housing',
  'Homelessness/Poverty',
  'Special Needs',
];
export const environmentalType = ['Indoor', 'Outdoor', 'Both', 'No Preference'];
export const orgPublications = {
  org: 'Org',
};
class OrganizationProfileCollection extends BaseProfileCollection {
  constructor() {
    super('OrganizationProfile', new SimpleSchema({
      username: String,
      organizationName: String,
      websiteLink: String,
      firstName: String,
      lastName: String,
      image: { type: String, defaultValue: 'https://semantic-ui.com/images/wireframe/image.png' },
      galleryImg1: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg2: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg3: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg4: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg5: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg6: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },
      email: String,
      primaryAddress: String,
      city: String,
      state: String,
      zipCode: String,
      phoneNumber: String,
      fields: { type: Array, required: false },
      'fields.$': { type: String, allowedValues: fieldsType, required: false },
      environmental: { type: String, allowedValues: environmentalType, required: false },
      about: String,
    }));
  }

  /**
   * Defines the profile associated with an Organization and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param websiteLink The website link
   * @param firstName The first name.
   * @param lastName The last name.
   * @param organizationName The name of the organization.
   * @param image The name of the organization.
   * @param primaryAddress The address of the organization.
   * @param city The city where the organization is located.
   * @param state The state where the organization is located.
   * @param zipCode Zipcode of the organization location.
   * @param phoneNumber Phone number of the organization.
   * @param fields The fields the organization covers.
   * @param environmental Environment that the organization is active on.
   * @param about Message about the organization.
   */
  define({ username, organizationName, websiteLink, firstName, lastName, password, image, galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6,
    email, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about }) {
    if (Meteor.isServer) {
      // const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.ORGANIZATION;
        const profileID = this._collection.insert({ organizationName, username, websiteLink,
          firstName, lastName, image, galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6, email, primaryAddress, city, state, zipCode, phoneNumber, fields,
          environmental, about, userID: this.getFakeUserId(), role });
        const userID = Users.define({ username, email, role, password });
        this._collection.update(profileID, { $set: { userID } });
        return profileID;
      }
      return user._id;
    }
    return undefined;
  }

  /**
   * Updates the UserProfile. You cannot change the email or role.
   * @param docID the id of the UserProfile
   * @param firstName new first name (optional).
   * @param organizationName
   * @param websiteLink
   * @param lastName new last name (optional).
   * @param image
   * @param galleryImg1
   * @param galleryImg2
   * @param galleryImg3
   * @param galleryImg4
   * @param galleryImg5
   * @param galleryImg6
   * @param primaryAddress
   * @param city
   * @param state
   * @param zipCode
   * @param phoneNumber
   * @param fields
   * @param environmental
   * @param about
   */
  update(docID, { firstName, organizationName, websiteLink, lastName, image,
    username, galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6,
    primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about }) {
    this.assertDefined(docID);
    const updateData = {};
    if (organizationName) {
      updateData.organizationName = organizationName;
    }
    if (websiteLink) {
      updateData.websiteLink = websiteLink;
    }
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (image) {
      updateData.image = image;
    }
    if (username) {
      updateData.username = username;
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
    if (galleryImg5) {
      updateData.galleryImg5 = galleryImg5;
    }
    if (galleryImg6) {
      updateData.galleryImg6 = galleryImg6;
    }
    if (primaryAddress) {
      updateData.primaryAddress = primaryAddress;
    }
    if (city) {
      updateData.city = city;
    }
    if (state) {
      updateData.state = state;
    }
    if (zipCode) {
      updateData.zipCode = zipCode;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }
    if (environmental) {
      updateData.environmental = environmental;
    }
    if (fields) {
      updateData.fields = fields;
    }
    if (about) {
      updateData.about = about;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.ORGANIZATION]);
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.ORGANIZATION) {
        problems.push(`UserProfile instance does not have ROLE.ORGANIZATION: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the UserProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  // firstName, lastName, organizationName, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const username = doc.username;
    const websiteLink = doc.websiteLink;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const image = doc.image;
    const galleryImg1 = doc.galleryImg1;
    const galleryImg2 = doc.galleryImg2;
    const galleryImg3 = doc.galleryImg3;
    const galleryImg4 = doc.galleryImg4;
    const galleryImg5 = doc.galleryImg5;
    const galleryImg6 = doc.galleryImg6;
    const primaryAddress = doc.primaryAddress;
    const city = doc.city;
    const organizationName = doc.organizationName;
    const state = doc.state;
    const zipCode = doc.zipCode;
    const phoneNumber = doc.phoneNumber;
    const fields = doc.fields;
    const environmental = doc.environmental;
    const about = doc.about;
    return { email, organizationName, websiteLink, firstName, lastName, username, image, galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6, primaryAddress, city, state, zipCode, phoneNumber, fields, environmental, about };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {OrganizationProfileCollectionCollection}
 */
export const OrganizationProfiles = new OrganizationProfileCollection();
