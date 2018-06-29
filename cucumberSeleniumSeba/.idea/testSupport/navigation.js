var chromedriver = require('chromedriver');
var firefox = require('geckodriver');
var selenium = require('selenium-webdriver');
var webdriverUtils = require('./webdriverUtils');
var platformConfig = require('./capabilities')[process.env.PLATFORM];
var baseUrl = require('./data/urls').environments[process.env.BASEURL];
var language = [process.env.LANG];
var resolution = [process.env.RES];
var chromeOpts;

module.exports = exports = (function () {

  var driver;

  function navigateToPage(urlExtension) {
    let desiredBrowser = chromedriver; 
    chromeOpts = {
      args: ['--lang=' + language]
    };
    if (platformConfig.browserName === 'firefox') {
      desiredBrowser = firefox;
    }

    if (resolution == 'phone') {
      chromeOpts = {
        args: ['--lang=' + language],
        mobileEmulation: {
          deviceName: 'iPhone 6/7/8'
        }
      };
    } else if (resolution == 'tablet') {
      chromeOpts = {
        args: ['--lang=' + language],
        mobileEmulation: {
          deviceName: 'iPad'
        }
      };
    }

    driver = _initialize(desiredBrowser);
    if ([process.env.BASEURL] == 'dev' || [process.env.BASEURL] == 'qa' || [process.env.BASEURL] == 'prod') {
      return driver.manage().window().maximize()
        .then(() => driver.get(baseUrl + urlExtension));
    } else {
      return driver.manage().window().maximize()
        .then(() => driver.get(baseUrl.authentication + urlExtension))
        .then(() => driver.get(baseUrl.clean + urlExtension));
    }
  }
  return {
    navigateToPage: navigateToPage
  };
}());

function _initialize(desiredBrowser) {
  if (platformConfig.browserName === 'chrome'){
    driver = new selenium.Builder().withCapabilities({
      browserName: platformConfig.browserName,
      javascriptEnabled: true,
      acceptSslCerts: true,
      chromeOptions: chromeOpts,
      path: desiredBrowser.path
    }).build();
  } else if (platformConfig.browserName === 'firefox'){
    driver = new selenium.Builder().withCapabilities({
      browserName: platformConfig.browserName,
      javascriptEnabled: true,
      acceptSslCerts: true,
      firefoxOptions: {
        args: ['intl.accept_languages', language]
      },
      path: desiredBrowser.path
    }).build();
  }
  
return driver;
  
}
