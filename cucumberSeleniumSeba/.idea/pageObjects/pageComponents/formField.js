var webdriverUtils = require('../../testSupport/webdriverUtils');
var Component = require('./component');

function FormField(locator) {
  Component.call(this, locator);
}

FormField.prototype = Object.create(Component.prototype);
FormField.prototype.constructor = FormField;

FormField.prototype.click = function () {
  if (process.env.PLATFORM === 'localIE') {
    return driver.executeScript("arguments[0].click();", this.getElement())
    .catch((err) => {
      return driver.sleep(4000)
        .then(() => { 
          return driver.executeScript("arguments[0].click();", this.getElement());
        });
    });
  } else {
    return this.getElement().click()
    .catch((err) => {
      return driver.sleep(4000)
        .then(() => { 
          return this.getElement().click();
        });
    });
  }
};

module.exports = exports = FormField;
