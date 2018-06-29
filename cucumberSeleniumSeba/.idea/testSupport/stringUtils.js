var _ = require('lodash');

module.exports = exports = {

  addQuotes: function (str, quoteCharacter) {
    var quote = (quoteCharacter || '\'');
    return quote + str + quote;
  },

  addSingleQuotes: function (str) {
    return exports.addQuotes(str, '\'');
  },

  keysToDelimitedString: function (object, titleCase, delimiter) {
    var conversions = require('./conversions');
    var names = titleCase ? _.keys(object).map(conversions.toTitleCase) : _.keys(object);
    return names.map(_.partial(exports.addQuotes, _, delimiter)).join(', ');
  },

  contains: function (string, substring) {
    return string && substring ? string.indexOf(substring) > -1 : false;
  },

  replaceFeatureDelimiters: function (string, withDelimiter) {
    return string ? string.toString().replace(/ and | & | > | \/ | \. /g, withDelimiter || ', ') : '';
  },

  firstWordOf: function (string, delimiter) {
    return _.first(string.split(delimiter || ' ')).toLowerCase();
  },

  lastWordOf: function (string, delimiter) {
    return _.last(string.split(delimiter || ' ')).toLowerCase();
  }

};
