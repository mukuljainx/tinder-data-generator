/**
 * API Endpoints
 * @author ayusharma
 *
 */
const { find, score } = require('../controllers/profile');

/**
 * App routes
 * @param {object} app initialised app
 */
module.exports = function(app) {
  app.route('/api/profiles').get(find);
  app.route('/api/rate').put(score);
};
