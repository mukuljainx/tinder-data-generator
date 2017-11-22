/**
 * Mongoose config
 * @author ayusharma
 */
const mongoose = require('mongoose');
const config = require('./config');

module.exports = function() {
  console.log(config.db);
  const db = mongoose.connect(config.db, { useMongoClient: true });
  require('../models/profile');
  return db;
};
