import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

export const gender = ['Female', 'Male', 'Other', 'Prefer Not To Say'];
export const interests = [
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

export const skills = [
  'Agriculture',
  'Construction',
  'Education',
  'Engineering',
  'Event Planning',
  'Sales/Marketing',
  'Technology',
  'Graphic/Web Design',
  'CPR',
  'First Aid',
  'Nursing',
  'Other',
];

export const availability = [
  'One-time',
  'Once a month',
  'Once a week',
  '1-3 times a week',
  'More than 3 times a week',
  'Weekends only',
  'Weekdays only',
];

export const preferences = ['Indoor', 'Outdoor', 'Both', 'No Preference'];

class VolunteerCollection extends BaseProfileCollection {
  constructor() {
    super('VolunteerProfile', new SimpleSchema({
      dateOfBirth: String,
      genderType: { type: String, allowedValues: gender },
      address: String,
      city: String,
      state: String,
      zip: Number,
      phone: String,
      username: String,
      interestsType: { type: Array, allowedValues: interests },
      skillsType: { type: Array, allowedValues: skills },
      preferencesType: { type: String, allowedValues: preferences },
      availabilityType: { type: String, allowedValues: availability },
      hours: Number,
    }));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   * @param dateOfBirth Date of birth of user.
   * @param genderType Gender of user.
   * @param address Street address of user.
   * @param city City of user.
   * @param state State where user is from.
   * @param zip Zipcode of user.
   * @param phone Phone number of user.
   * @param username Username for user.
   * @param interestsType Interests the user has.
   * @param skillsType Skills the user has.
   * @param preferencesType Preferences of the user.
   * @param availabilityType Availability of user.
   */
  define({ email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType }) {
    if (Meteor.isServer) {
      // const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.USER;
        const profileID = this._collection.insert({ email, firstName, lastName, userID: this.getFakeUserId(), role, dateOfBirth, genderType, address, city, state, zip, phone, username, interestsType, skillsType, preferencesType, availabilityType });
        const userID = Users.define({ username, role, password });
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
 * @type {VolunteerCollection}
 */
export const VolunteerProfiles = new VolunteerCollection();