import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class VolunteerSignupPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.VOLUNTEER_SIGN_UP}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupVolunteer(firstName, lastName, email, dateOfBirth, primaryAddress, city, state, zipcode, phoneNumber, username, password, conPassword) {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRSTNAME}`, firstName);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LASTNAME}`, lastName);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, email);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_DATE_OF_BIRTH}`, dateOfBirth);
    await t.click('#sign-up-form-gender-type-Female');
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PRIMARY_ADDRESS}`, primaryAddress);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_CITY}`, city);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_STATE}`, state);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_ZIPCODE}`, zipcode);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PHONE_NUMBER}`, phoneNumber);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_USERNAME}`, username);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, password);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_CONFIRM_PASSWORD}`, conPassword);
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_INTERESTS_TYPE}`);
    const selectInterest = Selector('span').withText('Housing');
    await t.click(selectInterest);
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_INTERESTS_TYPE}`);
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SKILLS_TYPE}`);
    const selectSkill = Selector('span').withText('Technology');
    await t.click(selectSkill);
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SKILLS_TYPE}`);
    await t.click('#sign-up-form-pref-type-Both');
    await t.click('#sign-up-form-avail-type-One-time');
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_PRIVACY_POLICY}`);
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SUBMIT}`);
  }
}
export const volunteerSignUp = new VolunteerSignupPage();
