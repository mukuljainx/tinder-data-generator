const fs = require('fs');
const request = require('request');
const {Builder, By, Key, until} = require('selenium-webdriver');

// configuration
const config = require('./config');

console.log(config);

let driver = new Builder()
    .forBrowser('chrome')
    .build();

const swipeRight = (i) => {
    console.log(i);
    return driver.findElement(By.tagName("body")).sendKeys("webdriver", Key.ARROW_RIGHT);
}

const findImage = () => {
  return driver
    .wait(
      until.elementLocated(By.css("div.recCard__img.StretchedBox")), 6000000)
    .then(el => {
      return el;
    });
};

function downloadFile(localPath, name, url) {
  return new Promise(function(reject, resolve) {
    console.log(">>>>>>>>>>>>>>>>>>.");
    console.log(url, localPath, name);
    const fileName = `${localPath}/${name}.jpg`;
    if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath);
    }

    request(url)
      .on("error", reject("error"))
      .pipe(fs.createWriteStream(fileName));
    on("finish", () => {
      resolve("true");
    });
  });
};


driver.get('https://tinder.com');
// driver.sleep(20000); 
// so in these 35 seconds this time just login using fb manually.
// I was feeling so lazy to write automation for this.
[...Array(10000)].forEach((value, index) => {
    driver
      .then(() => findImage())
      .then(elem => elem.getAttribute("style"))
      .then(rawLink => {
        const downloadUrl = rawLink.split("");
        downloadUrl.splice(0, 23);
        downloadUrl.splice(-3);
        return downloadUrl.join("");
      })
      .then(url => console.log(url))
      .then(() => swipeRight(index));
});

driver.quit();
