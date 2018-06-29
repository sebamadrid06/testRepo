var stringUtils = require('../stringUtils');
var lookup = require('../../pageObjects/lookup');
var _ = require('lodash');
var quote = stringUtils.addSingleQuotes;

module.exports = {
  getMessageSuffix: getMessageSuffix,
  getPageComponentOfType: getPageComponentOfType,
  getPageComponent: getPageComponent
};


function getPageComponentOfType(pageComponent, componentType) {
  var returnedValue = pageComponent;
  if (!pageComponent) {
    throw new Error('A non-existent page component has been passed into this expectation.');
  }

  if (componentType && componentType !== 'field') {
    returnedValue = pageComponent[componentType] || _.get(pageComponent,['main',componentType]);
  }

  if (!returnedValue) {
    throw new Error('The \'' + (componentType || 'field') + '\' locator has not been defined for the ' +
      getMessageSuffix(pageComponent, 'field', pageComponent) + ' but is required for this expectation.');
  }
  return returnedValue;
}


function getMessageSuffix(pageComponent, componentType, pageComponentOfType, fieldName) {
  var prefix, objectName;
  var messageSuffix = [];
  pageComponent.fieldData && pageComponent.fieldData.context && messageSuffix.push(`${pageComponent.fieldData.context}\n`);
  prefix = pageComponent.fieldData ? pageComponent.fieldData.fieldName : fieldName;
  prefix && messageSuffix.push(`Field name: ${quote(prefix)}\n`);
  objectName = pageComponent.objectName ? '(' + pageComponent.objectName + ')\n' : '';
  objectName && messageSuffix.push(objectName);
  messageSuffix.push('Type: ',pageComponent.constructor.name, '>' , (componentType || 'field'), '\n');
  pageComponentOfType.getLocator && messageSuffix.push('LOCATED BY ' + quote(pageComponentOfType.getLocator()) + '\n');
  return messageSuffix.join(' ');
}

function getPageComponent(config) {
  var pageComponent;
  if (_.isObject(config.page)) {
    pageComponent = lookup.pageComponentByName(config.page, config.field, config.context);
  } else if (_.isString(config.page)) {
    pageComponent = lookup.pageAndComponentByName(config.page + ' ' + config.field, config.context).component;
  } else {
    throw new Error('No page component was supplied in step expectation config: ' + JSON.stringify(config));
  }
  return pageComponent;
}

