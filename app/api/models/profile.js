/**
 * Tinder User model
 * @author ayusharma
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Image schema
 */
const imageSchema = new Schema({
  uuid: String,
  score: [],
  src: String
});

/**
 * User schema
 */
const ProfileSchema = new Schema({
  name: String,
  age: String,
  bio: String,
  images: [imageSchema],
  score: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
