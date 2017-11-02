const { find, score } = require("../controllers/user");

module.exports = function(app) {
  app.route("/api/find").get(find);
  app.route("/api/score").put(score);
};
