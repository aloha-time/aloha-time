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

class VolunteerProfileCollection extends BaseProfileCollection {
  constructor() {
    super('VolunteerProfile', new SimpleSchema({
      firstName: String,
      lastName: String,
      email: String,
      dateOfBirth: String,
      genderType: { type: String, allowedValues: gender },
      address: String,
      city: String,
      state: String,
      zip: Number,
      phone: String,
      username: String,
      hours: { type: Number, defaultValue: 0 },
      interestsType: { type: Array, required: false },
      'interestsType.$': { type: String, allowedValues: interests },
      skillsType: { type: Array, required: false },
      'skillsType.$': { type: String, allowedValues: skills },
      preferencesType: { type: String, allowedValues: preferences },
      availabilityType: { type: String, allowedValues: availability },
      image: { type: String, defaultValue: 'https://semantic-ui.com/images/wireframe/image.png' },
      galleryImg1: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg2: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg3: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg4: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg5: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

      galleryImg6: { type: String, defaultValue: 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg' },

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
  define({ email, firstName, lastName, password, dateOfBirth, genderType, address, city, state, zip, phone, username, hours,
    interestsType, skillsType, preferencesType, availabilityType,
    image, galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6 }) {
    if (Meteor.isServer) {
      // const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.VOLUNTEER;
        const profileID = this._collection.insert({ email, firstName, lastName, userID: this.getFakeUserId(), role, dateOfBirth, genderType, address, city, state, zip, phone, username, hours, interestsType, skillsType,
          preferencesType, availabilityType, image, galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6 });
        const userID = Users.define({ username, email, role, password });
        this._collection.update(profileID, { $set: { userID } });
        return profileID;
      }
      return user._id;
    }
    return undefined;
  }

  /**
   * Updates the UserProfile. You cannot change the email or role or username.
   * @param docID the id of the UserProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   */

  update(docID, { firstName, lastName, dateOfBirth, genderType, address, city, state, zip, phone, hours, username,
    interestsType, skillsType, preferencesType, availabilityType, image, galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6 }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (dateOfBirth) {
      updateData.dateOfBirth = dateOfBirth;
    }
    if (genderType) {
      updateData.genderType = genderType;
    }
    if (address) {
      updateData.address = address;
    }
    if (city) {
      updateData.city = city;
    }
    if (state) {
      updateData.state = state;
    }
    if (zip) {
      updateData.zip = zip;
    }
    if (phone) {
      updateData.phone = phone;
    }

    if (hours) {
      updateData.hours = hours;
    }

    if (username) {
      updateData.username = username;
    }

    if (interestsType) {
      updateData.interestsType = interestsType;
    }
    if (skillsType) {
      updateData.skillsType = skillsType;
    }
    if (preferencesType) {
      updateData.preferencesType = preferencesType;
    }
    if (availabilityType) {
      updateData.availabilityType = availabilityType;
    }
    if (image) {
      updateData.image = image;
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.VOLUNTEER]);
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
      if (doc.role !== ROLE.VOLUNTEER) {
        problems.push(`VolunteerProfile instance does not have ROLE.Volunteer: ${doc}`);
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
    const dateOfBirth = doc.dateOfBirth;
    const genderType = doc.genderType;
    const address = doc.address;
    const city = doc.city;
    const state = doc.state;
    const zip = doc.zip;
    const phone = doc.phone;
    const hours = doc.hours;
    const interestsType = doc.interestsType;
    const skillsType = doc.skillsType;
    const preferencesType = doc.preferencesType;
    const availabilityType = doc.availabilityType;
    const image = doc.image;
    const galleryImg1 = doc.galleryImg1;
    const galleryImg2 = doc.galleryImg2;
    const galleryImg3 = doc.galleryImg3;
    const galleryImg4 = doc.galleryImg4;
    const galleryImg5 = doc.galleryImg5;
    const galleryImg6 = doc.galleryImg6;
    return { firstName, lastName, email, dateOfBirth, genderType, address, city, state, zip, phone, hours, interestsType, skillsType, preferencesType, availabilityType, image, galleryImg1, galleryImg2, galleryImg3, galleryImg4,
      galleryImg5, galleryImg6 };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {VolunteerProfileCollection}
 */
export const VolunteerProfiles = new VolunteerProfileCollection();
