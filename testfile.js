var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.firefox())
  .build();

driver.get('http://172.16.30.215:8000');

driver.getTitle().then(function(title) {
  console.log('test page:' + title);
});

driver.findElement(webdriver.By.tagName('img')).then(function(el) {
  el.getAttribute('srcset').then(function(val) {
    console.log('srcset is: \n' + val);
  });
  el.getAttribute('src').then(function(val) {
    console.log('src is: \n' + val);
  });
});
