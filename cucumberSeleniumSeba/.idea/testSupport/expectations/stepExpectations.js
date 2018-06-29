var chai = require('chai');
var expect = chai.expect;
var webdriverUtils = require('../webdriverUtils');
var moment = require('moment');
var tableValidator = require('./tableValidator');
var singleExpects = require('./singleExpectations');
var stepExpectationTypes = require('./stepExpectationTypes');
var {By} = require('selenium-webdriver');

module.exports = exports = {

  toBeDisplayed: function (displayResult) {
      return expect(displayResult).to.equal(true);
  },

  allToBeDisplayed: function (pageComponent) {
      return pageComponent.isDisplayed().then((isDisplayed) => {
        return expect(isDisplayed).to.equal(true);
    });
  },

  notToBeDisplayed: function (pageComponent) {
    return pageComponent.isDisplayed().then((isDisplayed) => {
      return expect(isDisplayed).to.equal(false);
    });
  },

  toBePresent: function (pageComponent) {
    return pageComponent.isPresent().then((isPresent) => {
      return expect(isPresent).to.equal(true);
    });
  },

  notToBePresent: function (pageComponent) {
    return pageComponent.isPresent().then((isPresent) => {
      return expect(isPresent).to.equal(false);
    });
  },

  toBeEquals: function (item1, item2) {
    return expect(item1).to.equal(item2);
  },

  toBeVisibleInViewPort: function (pageComponent) {
    return pageComponent.isVisibleInViewPort().then((isVisible) => {
      return expect(isVisible).to.equal(true);
    });
  },

  toContainExactText: function (pageComponent, text) {
    return pageComponent.get().then((extractedText) => {
      return expect(text).to.equal(extractedText);
    });
  },

  toBeDisabled: function (pageComponent) {
    return pageComponent.getAttribute('class').then((classes) => {
      return expect(classes).to.contain('disabled');
    });
  },

  toBeEnabled: function (pageComponent) {
    return pageComponent.getAttribute('class').then((classes) => {
      return expect(classes).to.not.contain('disabled');
    });
  },


  toBeSelected: function (pageComponent, value) {
    let classValue = value || true;
    return pageComponent.getAttribute('class').then((classes) => {
      return expect(classes).to.contain(classValue);
    });
  },

  toBeActive: function (pageComponent) {
    return pageComponent.getAttribute('class').then((classes) => {
      return expect(classes).to.contain('active');
    });
  },

  toNotBeActive: function (pageComponent) {
    return pageComponent.getAttribute('class').then((classes) => {
      return expect(classes).not.to.contain('active');
    });
  },

  toBeUnselected: function (pageComponent) {
    return pageComponent.getAttribute('class').then((classes) => {
      return expect(classes).to.contain('false');
    });
  },

  toBeHighlighted: function (pageComponent , previousColor) {
    return pageComponent.getCssValue("color").then((color) => {
      return expect(color).not.to.equal(previousColor);
    });
  },

  tableToMeetExpectations: function (config) {
    return driver.controlFlow().execute(() => {
      const startTime = moment(new Date());
      var verifyFunction = _getVerifyFunction(config);
      var expectations = config.table.hashes();
      return webdriverUtils.promiseFor((i) => i < expectations.length
          , (i) => verifyFunction(expectations[i], i, config).then(() => ++i)
          , 0);

    });
  },

  toBeLowercase: function (pageComponent) {
    return pageComponent.get().then((extractedText) => {
      return expect(extractedText).to.not.be.uppercase;
    });
  },

  toContainText: function (item1, item2) {
    return expect(item1).to.contain(item2);
  }
};

function _getVerifyFunction(config) {
  var verifyFunction;
  if (!config.function) {
    tableValidator.validateGenericTable(config.table);
    verifyFunction = _rowToMeetExpectation;
  } else {
    verifyFunction = config.function;
  }
  return verifyFunction;
}

function _rowToMeetExpectation(row, rowIndex, config) {
  return singleExpects.stepToMeetExpectation({
    page: config.container || config.page,
    field: (config.field ? config.field + ' > ' : '') + tableValidator.dataForColumn('field', row),
    type: tableValidator.dataForColumn('expectation', row),
    value: tableValidator.dataForValueColumn(row),
    index: tableValidator.dataForColumn('index', row),
    context: 'TABLE ROW #' + (rowIndex + 1)
  });

}
