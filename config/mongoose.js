const mongoose = require("mongoose");
const config = require("./db");

module.exports = function() {
  const db = mongoose.connect(config.db);
  require("../models/user");
  return db;
};
