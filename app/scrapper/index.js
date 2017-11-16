/**
 * Tinder scraper
 * @author ayusharma
 */

const fs = require('fs');
const request = require('request');
const { v4 } = require('uuid');
const { Builder, By, Key, until } = require('selenium-webdriver');

// Internal dependecies
const configureMongoose = require('../api/config/mongoose');
const user = require('../api/controllers/profile');
const db = configureMongoose();

// Browser instance
let driver = new Builder().forBrowser('chrome').build();

/**
 * Swipe right
 * @param {*} i
 * @returns {promise}
 */
const swipeRight = i => {
  console.log(i);
  return driver
    .findElement(By.tagName('body'))
    .sendKeys('webdriver', Key.ARROW_RIGHT);
};

/**
 * Select profile for image extraction
 * @returns {promise}
 */
const selectProfile = () => {
  return driver
    .findElement(By.tagName('body'))
    .sendKeys('webdriver', Key.ARROW_UP);
};

/**
 * Get next image after an image extraction
 * @returns {promise}
 */
const nextImage = () => {
  return driver
    .findElement(By.tagName('body'))
    .sendKeys('webdriver', Key.SPACE);
};

/**
 * Find element to start
 * @param {string} classToScrap
 * @returns {promise}
 */
const findElement = classToScrap => {
  return driver.wait(until.elementLocated(By.css(classToScrap)), 6000000);
};

/**
 * Get bio from tinder profile
 * @param {string} nameOfClass
 * @returns {promise}
 */
const getBio = nameOfClass => {
  return new Promise((resolve, reject) => {
    driver.findElement(By.css(nameOfClass)).then(
      function(webElement) {
        resolve(webElement.getText());
      },
      function(err) {
        resolve('');
      }
    );
  });
};

/**
 * Get user name
 * @param {string} nameOfClass
 * @returns {promise}
 */
const getName = nameOfClass => {
  return driver.wait(until.elementLocated(By.css(nameOfClass)), 10000).then(
    function(webElement) {
      return webElement.getText();
    },
    function(err) {
      return Promise.reject('');
    }
  );
};

/**
 * Get image count in selected profile
 * @returns {promise}
 */
const getImageCount = () => {
  return driver
    .findElements(
      By.css('div.profileCard__sliderContainer [data-swipeable="true"]')
    )
    .then(webElement => webElement.length)
    .catch(() => Promise.reject('No Images'));
};

/**
 * Get image URL to donwload
 * @returns {promise}
 */
const getImageUrl = () => {
  return driver.wait(
    until.elementLocated(By.css('div[aria-hidden="false"] img')),
    10000
  );
};

/**
 * Download file from URL and save to specified directory.
 * @param {string} localPath
 * @param {string} name
 * @param {string} url
 */
const downloadFile = (localPath, name, url) => {
  const fileName = `${localPath}/${name}.jpg`;
  if (!fs.existsSync(localPath)) {
    fs.mkdirSync(localPath);
  }

  request(url).pipe(fs.createWriteStream(fileName));
};

/**
 * Save extracted data to DB
 * @param {*} payload
 */
const insertIntoDb = payload => {
  user.create({
    name: payload.name,
    age: payload.age,
    bio: payload.bio,
    images: payload.images,
    score: 0
  });
};

/**
 * Initialiser
 */
driver.get('https://tinder.com');
// so in these 35 seconds this time just login using fb manually.
// I was feeling so lazy to write automation for this.
[...Array(10000)].forEach((value, index) => {
  const data = {
    images: []
  };
  const init = driver
    .then(() => findElement('div.recCard__img.StretchedBox'))
    .then(() => selectProfile())
    .then(() => getName('div.profileCard__nameAge'))
    .then(name => {
      console.log(name);
      data.name = name.substr(0, name.indexOf(','));
      data.age = parseInt(name.substr('-2'), 10);
    })
    .then(() => console.log('name loaded'))
    .then(() => driver.sleep(3000))
    .then(() => getImageCount())
    .then(count => {
      console.log(count);
      return [...Array(count)].reduce(res => {
        getImageUrl()
          .then(url => url.getAttribute('src'))
          .then(src => {
            const obj = { src, uuid: v4(), score: [] };
            res.push(obj);
            return obj;
          })
          .then(obj => {
            downloadFile('./tmp', obj.uuid, obj.src);
          });
        nextImage();
        driver.sleep(2000);
        return res;
      }, []);
    })
    .then(urls => Array.prototype.push.apply(data.images, urls))
    .then(() => console.log('image loaded'))
    .then(() => getBio('div.profileCard__bio span'))
    .then(bio => {
      data.bio = bio ? bio : '';
    })
    .then(() => getBio('div.profileCard__info'))
    .then(abt => {
      // not keep distance info
      abt.indexOf('away') > -1 ? (data.about = '') : (data.about = abt);
    })
    .then(() => console.log(data))
    .then(() => insertIntoDb(data))
    .catch(err => {
      console.log(err);
      driver.navigate().refresh();
    })
    .finally(() => swipeRight(index));
});

driver.quit();
