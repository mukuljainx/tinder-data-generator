/**
 * Load config accordin to the environment.
 * @author ayusharma
 */

module.exports = require(`./env/${process.env.NODE_ENV}.js`);
