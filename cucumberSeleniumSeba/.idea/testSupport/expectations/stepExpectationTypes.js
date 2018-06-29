const stringUtils = require('../stringUtils');
const _ = require('lodash');

let getMessageSuffix = require('./utils.js').getMessageSuffix;
let getPageComponentOfType = require('./utils').getPageComponentOfType;
module.exports = {

  getByName: function (expect, pageComponent, type, value, index) {
    let fieldData = pageComponent.fieldData;

    let expectationTypes = {
      'displayed': function () {
        return expect.toBeDisplayed(pageComponent, fieldData.componentType, fieldData.fieldName);
      },
      'not displayed': function () {
        return expect.notToBeDisplayed(pageComponent, fieldData.componentType, fieldData.fieldName);
      },
      'active': function () {
        return expect.toBeActive(pageComponent, fieldData.componentType, fieldData.fieldName);
      },
      'not active': function () {
        return expect.toNotBeActive(pageComponent, fieldData.componentType, fieldData.fieldName);
      },
      'not present': function () {
        return expect.toNotBePresent(pageComponent, fieldData.componentType, fieldData.fieldName);
      },
      'present': function () {
        return expect.toBePresent(pageComponent, fieldData.componentType, fieldData.fieldName);
      }
    };

    let expectationFunction = expectationTypes[type.toLowerCase()];
    if (!expectationFunction) {
      throw new Error('Invalid expectation type \'' + type + '\' supplied. Must be one of ' + _.keys(expectationTypes).map(stringUtils.addSingleQuotes).join(', '));
    }
    return expectationFunction();
  }

};


