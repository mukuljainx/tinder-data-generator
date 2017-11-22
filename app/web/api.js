/**
 * API service made on isomorphic fetch
 * Methods: GET, POST, PUT, DELETE, PATCH
 * Syntax:
 * api(url, options)
 *
 * @example
 * api.post('/test', {body: { a: 1 }})
 *
 */
import fetch from 'isomorphic-fetch';

/**
 * Get URL
 * @param {string} api
 * @param {string} url
 * @returns {string}
 */
export const getUrl = (api, url) => {
  if (!['http://', 'https://', '//'].some(prefix => url.startsWith(prefix))) {
    return api + url;
  }
  return url;
};

/**
 * API class
 */
class API {
  /**
   * Constructor
   * @param {object} config
   */
  constructor(config) {
    // check global api URL
    if (!config.api) {
      throw new Error('API_URL is not defined!');
    }
    ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].forEach(method => {
      this[method] = (url, options = {}) => {
        // get url
        let URL = getUrl(config.api, url);

        // checking options
        const opts = {
          method: method,
          body: options.body ? JSON.stringify(options.body) : undefined,
          headers: options.headers || {
            'Content-Type': 'application/json'
          },
          credentials: options.credentials || 'same-origin'
        };
        return fetch(URL, opts);
      };
    });
  }
}

export default API;
