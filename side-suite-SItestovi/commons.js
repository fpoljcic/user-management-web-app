const utils = require("./utils.js");
const tests = {};
tests["Provjera login i logout"] = async (driver, vars, opts = {}) => {
  await driver.get("https://user-management-web-app.herokuapp.com/");
  try {
    await driver.manage().window().setRect({
      width: 1552,
      height: 840
    });
  } catch (error) {
    console.log('Unable to resize window. Skipping.');
  };
  await driver.wait(until.elementLocated(By.css(`.ant-btn`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`proba`);
    });
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`proba`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.login-container`)), configuration.timeout);
  await driver.findElement(By.css(`.login-container`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`faris`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-input-password`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-input-password`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`password`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn`)).then(element => {
    return element.click();
  });
}
tests["Provjera editovanja uposlenika"] = async (driver, vars, opts = {}) => {
  await driver.get("https://user-management-web-app.herokuapp.com/");
  try {
    await driver.manage().window().setRect({
      width: 1552,
      height: 840
    });
  } catch (error) {
    console.log('Unable to resize window. Skipping.');
  };
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`faris`);
    });
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`password`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-table-row:nth-child(8) > .ant-table-cell:nth-child(12) > a`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-table-row:nth-child(8) > .ant-table-cell:nth-child(12) > a`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-input-group:nth-child(10) > .ant-row`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-input-group:nth-child(10) > .ant-row`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.name(`country`)), configuration.timeout);
  await driver.findElement(By.name(`country`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`proba`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn:nth-child(1)`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn:nth-child(1)`)).then(element => {
    return element.click();
  });
}
tests["Provjera pretrage"] = async (driver, vars, opts = {}) => {
  await driver.get("https://user-management-web-app.herokuapp.com/");
  try {
    await driver.manage().window().setRect({
      width: 1552,
      height: 840
    });
  } catch (error) {
    console.log('Unable to resize window. Skipping.');
  };
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`faris`);
    });
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`password`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-table-cell:nth-child(2) .ant-table-filter-trigger-container svg`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-table-cell:nth-child(2) .ant-table-filter-trigger-container svg`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-input`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-input`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`Denis`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn-primary`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn-primary`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.active`)), configuration.timeout);
  await driver.findElement(By.css(`.active`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn:nth-child(3)`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn:nth-child(3)`)).then(element => {
    return element.click();
  });
}
tests["Pregled historije uposlenika"] = async (driver, vars, opts = {}) => {
  await driver.get("https://user-management-web-app.herokuapp.com/");
  try {
    await driver.manage().window().setRect({
      width: 1552,
      height: 840
    });
  } catch (error) {
    console.log('Unable to resize window. Skipping.');
  };
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`faris`);
    });
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`passwordWrong`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-table-row:nth-child(2) > .ant-table-cell:nth-child(11) > a`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-table-row:nth-child(2) > .ant-table-cell:nth-child(11) > a`)).then(element => {
    return element.click();
  });
}
tests["Provjera dugme za notifikacije"] = async (driver, vars, opts = {}) => {
  await driver.get("https://user-management-web-app.herokuapp.com/");
  try {
    await driver.manage().window().setRect({
      width: 1552,
      height: 840
    });
  } catch (error) {
    console.log('Unable to resize window. Skipping.');
  };
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_username`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_username`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`faris`);
    });
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`normal_login_password`)), configuration.timeout);
  await driver.findElement(By.id(`normal_login_password`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`password`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.ant-btn > span`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-btn > span`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-menu-item:nth-child(1)`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-menu-item:nth-child(1)`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-typography`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-typography`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.ant-menu-item:nth-child(1)`)), configuration.timeout);
  await driver.findElement(By.css(`.ant-menu-item:nth-child(1)`)).then(element => {
    return element.click();
  });
}
module.exports = tests;