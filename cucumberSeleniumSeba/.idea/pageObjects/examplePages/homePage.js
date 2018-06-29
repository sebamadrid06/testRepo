const components = require('../pageComponents');
const formField = components.FormField;

module.exports = function () {
  return {
    user: input({field: '[name=username]'})
  };
};
