/**
 * API server.
 * @author ayusharma
 * @example
 * To start API server
 * node apiserver.js
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');

const db = configureMongoose();
const app = configureExpress();

app.listen(7000);

console.log('Server running at http://localhost:7000/', process.env.NODE_ENV);

module.exports = app;
