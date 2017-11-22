/**
 * Isomorphic Fetch mocks
 * @author ayusharma
 */

const testData = {
  test: 'something'
};
/**
 * fetch
 * @param {string} url
 * @param {object} config
 * @returns {promise}
 */
export default function fetch(url, config = { method: 'GET' }) {
  if (!url) {
    throw new Error('URL is not defined');
  }
  return new Promise(function(resolve, reject) {
    switch (config.method) {
      case 'GET':
        resolve({
          json: () => {
            return { test: 'something' };
          }
        });
      case 'POST':
        resolve({
          json: () => {
            return JSON.parse(config.body);
          }
        });
      case 'PUT':
        resolve({
          json: () => {
            return JSON.parse(config.body);
          }
        });
      case 'PATCH':
        resolve({
          json: () => {
            return JSON.parse(config.body);
          }
        });
      case 'DELETE':
        resolve({
          json: () => {
            return {};
          }
        });
    }
  });
}