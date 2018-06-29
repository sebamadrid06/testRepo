const conversions = require('../conversions');
const webdriverUtils = require('../webdriverUtils');
const lookup = require('../../pageObjects/lookup');
const _ = require('lodash');
const utils = require('./utils');
const chai = require('chai');
const expect = chai.expect;
const stepExpectationTypes = require('./stepExpectationTypes');

const getPageComponentOfType = utils.getPageComponentOfType;
const getPageComponent = utils.getPageComponent;

module.exports = exports = {



  toBeDisplayed: function (pageComponent, componentType, fieldName) {
    const pageComponentOfType = getPageComponentOfType(pageComponent, componentType);
    return webdriverUtils.waitForPresence(pageComponentOfType.getLocator())
      .then(() => webdriverUtils.waitToBeEnabled(pageComponentOfType.getLocator()))
      .then(() => pageComponentOfType.getElement().isDisplayed().then((isDisplayed) => {
        return expect(isDisplayed).to.equal(true);
      }));
  },

  notToBeDisplayed: function (pageComponent, componentType, fieldName) {
    const pageComponentOfType = getPageComponentOfType(pageComponent, componentType);
    return webdriverUtils.waitForPresence(pageComponentOfType.getLocator())
      .then(() => webdriverUtils.waitForInvisibility(pageComponentOfType.getElement()))
      .then(() => pageComponentOfType.getElement().isDisplayed().then((isDisplayed) => {
        return expect(isDisplayed).to.equal(false);
      }));
  },

  toBeActive: function (pageComponent, componentType, fieldName) {
    const pageComponentOfType = getPageComponentOfType(pageComponent, componentType);
    return webdriverUtils.waitForPresence(pageComponentOfType.getLocator())
      .then(() => webdriverUtils.waitToBeEnabled(pageComponentOfType.getLocator()))
      .then(() => pageComponentOfType.getAttribute('class').then((classes) => {
        return expect(classes).to.contain('active');
    }));
  },

  toNotBeActive: function (pageComponent, componentType, fieldName) {
    const pageComponentOfType = getPageComponentOfType(pageComponent, componentType);
    return webdriverUtils.waitForPresence(pageComponentOfType.getLocator())
      .then(() => webdriverUtils.waitToBeEnabled(pageComponentOfType.getLocator()))
      .then(() => pageComponentOfType.getAttribute('class').then((classes) => {
        return expect(classes).not.to.contain('active');
    }));
  },

  toNotBePresent: function (pageComponent, componentType, fieldName) {
    const pageComponentOfType = getPageComponentOfType(pageComponent, componentType);
    return pageComponentOfType.isPresent().then((isPresent) => {
      return expect(isPresent).to.equal(false);
    });
  },

  toBePresent: function (pageComponent, componentType, fieldName) {
    const pageComponentOfType = getPageComponentOfType(pageComponent, componentType);
    return pageComponentOfType.isPresent().then((isPresent) => {
      return expect(isPresent).to.equal(true);
    });
  },

  stepToMeetExpectation: stepToMeetExpectation
};

function stepToMeetExpectation(config) {
  return driver.controlFlow().execute(() => {
    var pageComponent = config.pageComponent;
    if (!pageComponent) {
      pageComponent = getPageComponent(config);
    }
    _setValue(config);
    _assertTypeIsNotEmpty(config);

    return stepExpectationTypes.getByName(exports, pageComponent, config.type, config.value, config.index);
  });
}

function _setValue(config) {
  if (_.isObject(config.valuePage)) {
    config.value = lookup.pageComponentByName(config.valuePage, config.valueField, config.context);
  } else if (_.isString(config.valuePage)) {
    config.value = lookup.pageAndComponentByName(config.valuePage + ' ' + config.valueField, config.context).component;
  }
}

function _assertTypeIsNotEmpty(config) {
  if (_.isEmpty(config.type)) {
    throw new Error('No expectation \'type\' was supplied in step expectation config: ' + JSON.stringify(config));
  }
}
