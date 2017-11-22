### Tinder Fun [![Build Status](https://travis-ci.org/ayusharma/tinder-data-generator.svg?branch=master)](https://travis-ci.org/ayusharma/tinder-data-generator) [![codecov](https://codecov.io/gh/ayusharma/tinder-data-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/ayusharma/tinder-data-generator)
* * *

This repository provides full data soultion to apply on a tinder profile.

### Features
 - Scrap data from tinder profiles including images, bio, about and name.
 - Rate every image and profile for the ML model using Tinder Mesh app.
 - Get downloaded images with Unique IDs.

### MongoDb 
```js
    {
    "_id" : ObjectId("59fb1e88fe1b1c3a6b6ba449"),
    "name" : "Rose",
    "age" : "24",
    "bio" : "Total bookworm, F.R.I.E.N.D.S, Potterhead, Aries, No coffee, No chocolate, Looking forward to have some good conversation, that's it!",
    "about": "software developer",
    "images" : [ 
        {
            "src" : "<Image URL here>",
            "uuid" : "f3dedf18-8ef6-40e6-bc09-866cbc1f217a",
            "_id" : ObjectId("59fb1e88fe1b1c3a6b6ba44c"),
            "score" : [5,4,2,1,4] // 5 ratings of the image
        }, 
        ...
        ...
        ...
        more images here
        ...
        ...
    ],
    "__v" : 0
}
```

### Setup
* * *

#### Requirements

Please make sure that you have Node.js and npm installed on your system. 
This application is built with Mongodb, without that you can't proceed.

- Node.js (recommended: 6.x)
- npm (recommended: 3.x)
- Mongo >= 3.4.10

#### Installation 
```
npm install
```

#### Tests
```
npm run test
```

#### Architecture
* * *
The project has divided in three parts.
1. **Scrapper** -  It scraps the data from tinder web UI using selenium and stores in
MongoDB according to the defined environment.
2. **Rater API** - APIs to rate every image of a scrap profile. These are built using
express, mongoose, mongodb, mocha and chai.
3. **Rater Web App** - It is a React appliation made to rate every image. The testing 
frameworks used are Jest and Enzyme.

Find the documentation of every section in their respective parts.

#### Running the application
```js
    npm run tinder-fun
```