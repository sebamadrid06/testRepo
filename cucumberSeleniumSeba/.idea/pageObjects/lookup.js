const _ = require('lodash');
const stringUtils = require('../testSupport/stringUtils');
const conversions = require('../testSupport/conversions');
const pageComponents = require('./pageComponents');
const pages = require('./pageObjects');

module.exports = exports = {

  fieldName: function (friendlyName) {
    const whiteSpaceInsensitivePageRegex = _.keys(pages).map(function (page) {
      return page.split('').join('\\s*');
    }).join('|');

    return (friendlyName.replace(new RegExp(whiteSpaceInsensitivePageRegex, 'i'), '')).trim();
  },

  containerName: function (friendlyName) {
    const fieldName = this.fieldName(friendlyName);
    const fieldNameRegExp = new RegExp(`${fieldName.trim()}$`);
    return (_.isEmpty(fieldName) ? friendlyName : friendlyName.replace(fieldNameRegExp, '')).trim();
  },

  pageObjectByName: function (friendlyName) {
    const pageObjectName = _.camelCase(friendlyName);
    const pageObject = pages[pageObjectName];
    if (!pageObject) {
      throw new Error('Page Object ' + stringUtils.addSingleQuotes(friendlyName) +
        ' does not exist. Must be one of ' + stringUtils.keysToDelimitedString(pages, stringUtils.contains(pageObject, ' ')));
    }
    return pageObject;
  },

  /**
   * Get a page and optionally the Component by its name. Often used in Cucumber Feature Files when a page object and field name is specified
   * and we want to get that object instance and do stuff with it.
   *
   * @param   {String} friendlyName             The fully qualified name of the field prefixed by the page name
   * @param   {String} context                  Purely descriptive context of lookup, used in cases when
   *                                            a lookup is being performed in a table and we want to know which row number it was etc
   *                                            For instance 'Payment Payment Options > Deposit Standard > selected',
   * @returns {Object} returnObject
   * @returns {Object} returnObject.page        The page object
   * @returns {Object} returnObject.component   The page component
   *
   */
  pageAndComponentByName: function (friendlyName, context) {
    friendlyName = friendlyName.replace(/&/,'');
    const pageName = this.containerName(friendlyName) || friendlyName;
    const pageObject = this.pageObjectByName(pageName);
    const returnObject = {page: pageObject};
    const fieldName = this.fieldName(friendlyName);

    if (!_.isEmpty(fieldName)) {
      returnObject.component = this.pageComponentByName(pageObject, fieldName, context);
    }
    return returnObject;
  },

  /**
   * Get a page Component by its name. Often used in Cucumber Feature Files when a field name is specified and we want to get that object instance and do stuff with it.
   *
   * @param   {Object} parentObj                The object in the Page Object that contains one of more page components.
   *                                            So for instance in PaxPage, the 'day' page component is in the leadPassenger.dob container
   *                                            If the container is paymentPage.paymentOptions and the field is 'Deposit Standard / selected',
   *                                            this gets turned into paymentPage.paymentOptions.depositStandard.selected in the Page Object hierarchy.
   *                                            So in the feature file, various delimiters (see stringUtils.replaceFeatureDelimiters) can be used to delimit
   *                                            the parent.child.toddler.baby fields and make it look nice.
   * @param   {String} lookupName               The fully qualified name of the field relative to the container
   * @param   {String} context                  Purely descriptive context of lookup, used in cases when
   *                                            a lookup is being performed in a table and we want to know which row number it was etc
   * @returns {Object} pageComponent            The page component field with some additional fields merged into the return value:
   * @returns {String} pageComponent.lookupName The name that was used in the feature file to lookup the page component at test runtime
   * @returns {String} pageComponent.objectName The javascript field name of the page component defined in its container object
   * @returns {Object} pageComponent.fieldData  The javascript object representing the componentType and the fieldName
   *
   */
  pageComponentByName: function (parentObj, lookupName, context) {
    const containerKey = 'container';
    const fieldData = _getFieldData(lookupName, lookupName, context);
    fieldData.parent = _.isEmpty(fieldData.parentPath) ? parentObj
      : _.get(parentObj, fieldData.parentPath);
    let field = _.get(parentObj, fieldData.objectName);
    _assertFiledDefined(field, fieldData, parentObj, lookupName);

    if (_.has(field, containerKey)) {
      let main = field;
      fieldData.objectName += '.' + containerKey;
      field = _.get(parentObj, fieldData.objectName);
      field.main = main;
    }
    _assertFieldIsValid(field, lookupName);

    return _.merge(field, {fieldData: fieldData});
  }
};


function _getFieldData(fieldName, lookupName, context) {

  const fieldData = {componentType: 'field', fieldName: fieldName, lookupName: lookupName, context: context};

  function setFieldData(fieldType) {
    if (_.endsWith(fieldData.fieldName.toLowerCase(), ' ' + fieldType)) {
      const fieldRegexp = new RegExp(`>*\\s*${fieldType}(?!.*${fieldType})`, 'i');
      fieldData.fieldName = fieldData.fieldName.replace(fieldRegexp, '');
      fieldData.componentType = fieldType;
    }
    fieldData.objectName = conversions.toObjectFieldName(fieldData.fieldName);
    fieldData.parentPath = fieldData.objectName.split('.');
    fieldData.name = fieldData.parentPath.pop();
  }

  ['field'].map(setFieldData);

  return fieldData;
}

function _assertFieldIsValid(field, lookupName) {
  if (!(_.contains(_.keys(pageComponents), field.constructor.name) || field.constructor.name.match(/function/i))) {
    const fieldType = protractor.promise.isPromise(field) ? 'promise' : field.constructor.name;
    throw new Error('The \'' + lookupName + '\' field was found to be of type ' + fieldType +
      ', but only one of the following Page Component types are allowed: ' + _.keys(pageComponents).join(', '));
  }
}

function _assertFiledDefined(field, fieldData, parentObject, lookupName) {
  if (_.isUndefined(field)) {

    const fieldList = fieldData.objectName.split('.');
    let stuckField;
    let successField;
    let successFieldName = '';
    fieldList.find((fieldName) => {
      let fieldPath = successFieldName + fieldName;
      let field = _.get(parentObject, fieldPath);
      if(_.isUndefined(field)) {
        stuckField = fieldName;
        return true;
      }
      successFieldName = fieldPath + '.';
      successField = field;
      return false;
    });
    const qualifier = fieldData.fieldName === fieldData.objectName ? '' : ' looked up using name \'' + fieldData.objectName + '\'';
    throw new Error(`The field ${lookupName} ${qualifier} does not exist in Page Components container object. 
    It stuck on ${stuckField} field in object with keys: ${Object.keys(successField)}`);
  }
}
