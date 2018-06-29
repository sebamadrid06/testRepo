
var stringUtils = require('./stringUtils');
var _ = require('lodash');
module.exports = exports = {

  toEnumString: function (string) {
    return string ? _.snakeCase(string.trim()).toUpperCase() : '';
  },

  toObjectFieldName: function (string) {
    return stringUtils.replaceFeatureDelimiters(string, '.').split('.').map(_.camelCase).join('.');
  },

  toBoolean: function (string, undefinedDefault) {
    switch (String(string).toLowerCase()) {
      case 'displayed':
        return true;
      case 'not displayed':
        return false;
      default:
        return undefinedDefault || false;
    }
  }

};

