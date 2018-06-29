var hooks = function () {

  this.setDefaultTimeout && this.setDefaultTimeout(120 * 1000);

  this.Before({tags: ['@skip']}, function (scenario, callback) {
    callback(null, 'pending');
  });

  this.After({tags: ['~@skip']}, function (scenario) {
    return driver.manage().deleteAllCookies()
      .then(() => driver.quit())
      .catch((err) => {
        return driver.switchTo().alert().accept()
          .then(() => driver.manage().deleteAllCookies())
          .then(() => driver.quit());
        });
  });

};


module.exports = hooks;
