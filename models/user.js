const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  age: String,
  bio: String,
  images: [],
  score: {
      type: Number,
      default: 0
  }
});

module.exports = mongoose.model('User', UserSchema);