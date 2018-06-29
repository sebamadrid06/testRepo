const LoginPage = require('./examplePages/loginPage');
const HomePage = require('./examplePages/homePage');
let login, home;

module.exports = {

  get login() {
    login = login ? login : new LoginPage();
    login._name = 'login';
    return login;
  },

  get home() {
    home = home ? home : new HomePage();
    home._name = 'home';
    return home;
  }
};
