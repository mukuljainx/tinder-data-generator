const configureMongoose = require("./config/mongoose");
const user = require("./controllers/user");

const db = configureMongoose();


user.create({
  name: 'String',
  age: 'String',
  bio: 'String',
  interest: [],
  images: [],
  score: {
      type: 'Number',
      default: 0
  }
});