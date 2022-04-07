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
  async signupVolunteer(username, password) {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_USERNAME}`, username);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, password);
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SUBMIT}`);
  }
}
export const volunteerSignUp = new VolunteerSignupPage();