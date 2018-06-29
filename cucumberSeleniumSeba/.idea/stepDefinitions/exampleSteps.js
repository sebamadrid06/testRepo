var navigation = require('../testSupport/navigation');
var utils = require('../testSupport/expectations/utils');
var pages = require('../pageObjects/pageObjects');
var urls = require('../testSupport/data/urls');
var _ = require('lodash');
var credentials = require('../testSupport/data/customerCredentials');
var webdriverUtils = require('../testSupport/webdriverUtils');
var expectations = require('../testSupport/expectations/stepExpectations');
var env = [process.env.BASEURL];
module.exports = function () {

  /*
   * Initializates the driver and navigates to the desired page
   * @params {string} 'page name' to be located in testSupport/data/urls.js
  */
  this.Given(/^I am a customer on (.*) page$/, function (page) {
    let cameledPage = _.camelCase(page);
    let urlExtension = urls[cameledPage]['urlExtension'];
    let identifier = urls[cameledPage]['identifier'];
    return navigation.navigateToPage(urlExtension)
      .then(() => webdriverUtils.waitForPresence(pages[cameledPage][identifier].getLocator(), 60000));
  });

  /*
   * Fills user and password field with the desired credentials
   * @params {string} 'credentiales state' to be located in testSupport/data/customerCredentials.js
  */
  this.When(/^I enter (.*) user credentials$/, function (state) {
    return pages.login.user.set(credentials.loginCredentials[state][env].user)
      .then(() => pages.login.password.set(credentials.loginCredentials[state][env].password));
  });

  /*
   * Clicks on the desired WebElement
   * @params {strings} pageObject + desiredElement
  */
  this.When(/^I click on the (.*) on (.*) page$/, function (fieldName, page) {
    const pageComponent = utils.getPageComponent({page: page, field: fieldName});
    return webdriverUtils.waitToBeEnabled(pageComponent.getLocator())
      .then(() => pageComponent.click());
  });

  /*
   * Puts the driver on a sleep state to wait for some seconds
   * @params {int}
  */
  this.When(/^I wait (\d+) seconds (.*)$/, function (time, explanation) {
    return driver.sleep(time * 1000);
  });

  /*
   * Checks if a WebElement is displayed on the page
   * @params {strings} pageObject + desiredElement
  */
  this.Then(/^the (.*) page (.*) should be displayed$/, function (page, fieldName) {
    const pageComponent = utils.getPageComponent({page: page, field: fieldName});
    return webdriverUtils.waitForPresence(pageComponent.getLocator())
      .then(() => webdriverUtils.waitToBeEnabled(pageComponent.getLocator()))
      .then((result) => expectations.toBeDisplayed(result));
  });

};
