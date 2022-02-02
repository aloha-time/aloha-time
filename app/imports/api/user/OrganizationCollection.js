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

class OrganizationCollection extends BaseProfileCollection {
  constructor() {
    super('OrganizationProfile', new SimpleSchema({
      firstName: String,
      lastName: String,
      primaryAddress: String,
      city: String,
      state: String,
      zipCode: String,
      phoneNumber: String,
      fields: { type: Array, required: false },
      'fields.$': { type: String, allowedValues: fieldsType, required: false },
      environmental: { type: String, allowedValues: environmentalType, required: false },
      about: String,
      owner: String,
    }));
  }

  /**
   * Defines the profile associated with an Organization and the associated Meteor account.
   * @param owner The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   * @param address The address of the organization.
   * @param city The city where the organization is located.
   * @param state The state where the organization is located.
   * @param zip Zipcode of the organization location.
   * @param phone Phone number of the organization.
   * @param fields The fields the organization covers.
   * @param environmental Environment that the organization is active on.
   * @param about Message about the organization.
   */
  define({ firstName, lastName, password, address, city, state, zip, phone, fields, environmental, about, owner }) {
    if (Meteor.isServer) {
      // const username = email;
      const user = this.findOne({ owner, firstName, lastName });
      if (!user) {
        const role = ROLE.USER;
        const profileID = this._collection.insert({ firstName, lastName, address, city, state, zip, phone, fields, environmental, about, owner });
        const userID = Users.define({ owner, role, password });
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
   * @param lastName new last name (optional).
   */
  update(docID, { firstName, lastName }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
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
      if (doc.role !== ROLE.User) {
        problems.push(`UserProfile instance does not have ROLE.USER: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the UserProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    return { email, firstName, lastName };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {OrganizationCollection}
 */
export const OrganizationProfiles = new OrganizationCollection();
