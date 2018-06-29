var webdriverUtils = require('../../testSupport/webdriverUtils');
var FormField = require('./formField');

function Input(locator) {
  FormField.call(this, locator);
}

Input.prototype = Object.create(FormField.prototype);
Input.prototype.constructor = Input;

Input.prototype.set = function (keys) {
  return webdriverUtils.waitToBeEnabled(this.getLocator())
    .then(() => this.getElement().clear())
    .then(() => this.getElement().sendKeys(keys));
};

Input.prototype.simpleSet = function (keys) {
  return webdriverUtils.waitToBeEnabled(this.getLocator())
    .then(() => this.getElement().sendKeys(keys));
};

Input.prototype.clear = function () {
  let element = this.getElement();
  return webdriverUtils.waitToBeEnabled(element)
    .then(() => element.clear());
};

module.exports = exports = Input;
