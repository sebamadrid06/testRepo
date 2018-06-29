const Component = require('./pageComponents/component');
const FormField = require('./pageComponents/formField');
const Input = require('./pageComponents/input');
module.exports = exports = {

  /**
   * Factory constructor for a Component
   * @constructor
   * @param locator (actually a string representing the locator)
   */
  Component: function (locator) {
    return new Component(locator);
  },

  /**
   * Factory constructor for a FormField
   * @constructor
   * @param locator
   */
  FormField: function (config) {
    return new FormField(config);
  },

  /**
   * Factory constructor for a Input
   * @constructor
   * @param locator
   */
  Input: function (config) {
    return new Input(config);
  }

};
