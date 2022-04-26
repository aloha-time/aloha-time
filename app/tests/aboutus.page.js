import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class AboutUsPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ABOUT_US}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    const waitTime = 15;
    await t.wait(waitTime * 1000).expect(this.pageSelector.exists).ok();
  }

}

export const aboutUsPage = new AboutUsPage();