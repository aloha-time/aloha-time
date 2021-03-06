import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout() {
    const loggedInUser = await Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists;
    if (loggedInUser) {
      await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
      await t.click(`#${COMPONENT_IDS.NAVBAR_SIGN_OUT}`);
    }
  }

  async gotoSigninPage() {
    await this.ensureLogout();
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN}`);
  }

  /**
  async goToBrowseOpportunitiesPage() {
    await this.ensureLogout();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HAMBURGER_MENU}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_BROWSE_OPPORTUNITIES}`);
  }
* */

  async goToCalendarSchedulePage() {
    await this.ensureLogout();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HAMBURGER_MENU}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_CALENDAR_SCHEDULE}`);
  }

  /**
  async goToOrganizationLibraryPage() {
    await this.ensureLogout();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HAMBURGER_MENU}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ORGANIZATION_LIBRARY}`);
  }
   * */

  async goToAboutUsPage() {
    await this.ensureLogout();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HAMBURGER_MENU}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_HAMBURGER_MENU_ABOUT_US}`);
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(username) {
    const loggedInUser = await Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).innerText;
    await t.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout() {
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_SIGN_OUT}`);
  }

  /** Pull down login menu, go to sign up page. */
  async gotoVolunteerSignupPage() {
    await this.ensureLogout();
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP}`);
  }

  /** Go to the manage database page. Must be adimin. */
  async gotoManageDatabasePage() {
    await t.expect(Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE}`);
  }
}

export const navBar = new NavBar();
