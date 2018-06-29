const components = require('../pageComponents');
const input = components.Input;
const formField = components.FormField;

module.exports = function () {
  return {
  	user: input({field: '#email'}),
    password: input({field: '#password'}),
    formContainer: formField({field: '.login-content.login-form'}),
    firstLoginButton: formField({field: '.authLinks.signupBasicHeader'}),
    secondLoginButton: formField({field: '.btn.login-button.btn-submit'})
  };
};
