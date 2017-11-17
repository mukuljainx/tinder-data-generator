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
  about: String,
  images: [imageSchema]
});

module.exports = mongoose.model('Profile', ProfileSchema);
