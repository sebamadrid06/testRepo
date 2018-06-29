var conversions = require('../conversions');
var quote = require('../stringUtils').addSingleQuotes;
var _ = require('lodash');


module.exports = exports = {

  validateColumns: function (expectedColumns, table) {
    var actualColumns = exports.columnNames(table);
    if (!_.every(expectedColumns, _.partial(_.includes, actualColumns))) {
      throw new Error('Data table requires columns with names ' + expectedColumns.map(quote).join(', ') + ' but ' + actualColumns.map(quote).join(', ') + ' were supplied.');
    }
  },

  dataForColumn: function (columnName, row, defaultValue) {
    var value = _.find(row, function (value, key) {
      return conversions.toEnumString(key) === conversions.toEnumString(columnName);
    });
    return _.isUndefined(value) ? defaultValue : (value === 'false' || value === 'true') ? JSON.parse(value) : value;
  },

  dataForValueColumn: function (row, defaultValue) {
    var value = exports.dataForColumn('value', row, defaultValue);
    var isFromWorld = new RegExp(/world\s*>/i).test(value);
    var isArray = new RegExp(/ :: /).test(value);
    if (isFromWorld) {
      value = _getValueFromWorld(value);
    } else if (isArray) {
      value = value.split(' :: ').map((value) => value.trim());
    }
    return value;
  },

  columnNames: function (table) {
    return _.keys(_.first(table.hashes())).map(function (column) {
      return column.toLowerCase();
    });
  },

  columnExists: function (column, table) {
    return _.includes(exports.columnNames(table), column.toLowerCase());
  },

  validateGenericTable: function (table) {
    var columnCount = _.keys(_.first(table.hashes())).length;
    if (!_.includes([2, 3, 4], columnCount)) {
      throw new Error('This step expects a data table with 2, 3 or 4 columns but you supplied ' + columnCount);
    }
    exports.validateColumns(_.take(['field', 'expectation', 'value', 'index'], columnCount), table);
  }

};

function _getValueFromWorld(valuePath) {
  var pathList = valuePath.split('>').slice(1);
  var value = pathList.reduce(function (accum, currentPath) {
    accum = accum[currentPath.trim()] || accum[_.camelCase(currentPath.trim())];
    _assertValuePath(accum, valuePath, currentPath);
    return accum;
  }, WORLD);
  return value;
}

function _assertValuePath(accum, valuePath, currentPath) {
  if (_.isUndefined(accum)) {
    throw new Error(`Value by path '${valuePath}' was not found. It was broken on '${currentPath}' item`);
  }
}
