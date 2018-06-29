const {By, until} = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

module.exports = exports = {

  waitForPresence: function (locator, timeMsecs) {
    let timeout;
    if (timeMsecs) {timeout = timeMsecs} else {timeout = 30000};
    return driver.wait(until.elementLocated(By.css(locator)), timeout)
    .catch((err) => {
      return driver.sleep(4000)
        .then(() => driver.wait(until.elementLocated(By.css(locator)), timeout));
    });
  },

  waitForInvisibility: function (element, timeMsecs) {
    let timeout;
    if (timeMsecs) {timeout = timeMsecs} else {timeout = 30000};
    return driver.wait(until.elementIsNotVisible(element), timeout);
  },

  waitForStaleness: function (element, timeMsecs) {
    let timeout;
    if (timeMsecs) {timeout = timeMsecs} else {timeout = 30000};
    return driver.wait(until.stalenessOf(element), timeout);
  },

  waitToBeEnabled: function (locator, timeMsecs) {
    let element = driver.findElement(By.css(locator));
    let timeout;
    if (timeMsecs) {timeout = timeMsecs} else {timeout = 30000};
    return driver.wait(until.elementIsVisible(element), timeout)
      .then(() => { return true })
      .catch((err) => {
      return driver.sleep(4000)
        .then(() => driver.findElement(By.css(locator)))
        .then((refreshedElement) => driver.wait(until.elementIsVisible(refreshedElement), timeout))
        .then(() => { return true })
        .catch(() => { return false });
    });
  },

  waitForText: function (element, text) {
    return driver.wait(until.elementTextIs(element, text), 10000);
  },

  hover: function (element) {
    return driver.actions().mouseMove(element).perform()
      .then(() => driver.sleep(3000));
  },

  scrollIntoView: function (element) {
    return driver.executeScript("arguments[0].scrollIntoView();", element);
  },

  openNewTab: function (pageUrl) {
    return driver.executeScript('window.open(\'' + pageUrl + '\');');
  },

  switchTabs: function (tab) {
    return driver.getAllWindowHandles().then(function (windowHandles) {
      driver.switchTo().window(windowHandles[tab - 1]);
    });
  },

  focusOnElement: function () {
    return driver.executeScript("window.focus();");
  },

  waitToBeVisibleInViewPort: function (selector) {
    return driver.wait(() => isElementInViewport(selector).catch((er) => {
        return false;
      })
      , 30000, 'waitToBeVisibleInViewPort:failed - ' + selector);
  },

  promiseFor: promiseFor,
  isElementInViewport: isElementInViewport

};

function promiseFor(condition, action, firstCondition) {
  if (!condition(firstCondition)) {
    return;
  }
  return driver.controlFlow().execute(function () {
    return action(firstCondition).then(promiseFor.bind(null, condition, action));
  });
}

function isElementInViewport(locator) {
  function checkVisibilityInViewPort(locator) {
    const DOMRect = document.querySelectorAll(`${locator}`)[0].getBoundingClientRect();
    return (
      DOMRect .top >= 0 &&
      DOMRect .left >= 0 &&
      DOMRect .bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
      DOMRect .right <= (window.innerWidth || document. documentElement.clientWidth)
    );
  }
  return driver.executeScript(checkVisibilityInViewPort, locator);
}
