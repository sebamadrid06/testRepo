const webdriverUtils = require('../../testSupport/webdriverUtils');
const _ = require('lodash');
const {By, until} = require('selenium-webdriver');

function Component(locator) {
  this.locator = locator.field;
}

/**
 * Get the element
 *
 * @this Component
 * @returns {ElementFinder}
 */
Component.prototype.getElement = function () {
  return driver.findElement(By.css(this.locator));
};

/**
 * Get all the elements with the same locator
 *
 * @this Component
 * @returns {ElementFinder}
 */
Component.prototype.getAllElements = function () {
  return driver.findElements(By.css(this.locator));
};

/**
 * Get the locator
 *
 * @this Component
 * @returns {string} locator
 */
Component.prototype.getLocator = function () {
  return this.locator;
};

/**
 * Get the current text value by getText function
 *
 * @this Component
 * @returns {Promise.<Text>}
 */
Component.prototype.get = function () {
  return _get.call(this);

  function _get() {
    return this.getElement().getText();
  }
};

/**
 * Get the desired attribute
 *
 * @this Component
 * @returns {string} attribute
 */
Component.prototype.getAttribute = function (attributeName) {
  return _getAttribute.call(this);

  function _getAttribute() {
    return this.getElement().getAttribute(attributeName);
  }
};

/**
 * Get the desired attribute
 *
 * @this Component
 * @returns {string} attribute
 */
Component.prototype.getCssValue = function (cssValue) {
  return _getCssValue.call(this);

  function _getCssValue() {
    return this.getElement().getCssValue(cssValue);
  }
};

Component.prototype.isDisplayed = function () {
  return _isDisplayed.call(this);

  function _isDisplayed() {
    return this._waitToBeDisplayed().then(() => true, (err) => false);
  }
};

Component.prototype.isPresent = function () {
  return driver.findElement(By.css(this.locator)).then(function(webElement) {
    return true;
  }, function(err) {
    return false;
  });
};

Component.prototype.isVisibleInViewPort = function () {
  return webdriverUtils.waitToBeVisibleInViewPort(this.locator);
};

Component.prototype._waitToBeDisplayed = function () {
  return driver.wait(() => this._isDisplayed(), 20 * 1000, `Component '${this._locator}' has not become present on the page`);
};

module.exports = exports = Component;
