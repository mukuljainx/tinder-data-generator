const {Builder, By, Key, until} = require('selenium-webdriver');

let driver = new Builder()
    .forBrowser('chrome')
    .build();

const swipeRight = (i) => {
    console.log(i);
    driver.findElement(By.tagName("body")).sendKeys("webdriver", Key.ARROW_RIGHT);
}

driver.get('https://tinder.com');
driver.sleep(50000); 
// so in these 35 seconds this time just login using fb manually.
// I was feeling so lazy to write automation for this.
[...Array(1000)].forEach((e,i) => {
    driver.sleep(1000).then(() => swipeRight(i));
});

driver.quit();
