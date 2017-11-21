/**
 * Isomorphic Fetch mocks
 * @author ayusharma
 */
const dataForGet = {
  name: 'rose',
  age: '14',
  bio: 'bio',
  images: {
    src: 'http://example.com/image.jpg',
    uuid: 'c2f6a139-f07e-4451-a295-567bbe8b8fce',
    _id: '5a0df128739e805d9e6d9355',
    score: [1]
  }
};

const dataForPUT = 'Successfully updated';

/**
 * fetch
 * @param {string} url
 * @param {object} config
 * @returns {promise}
 */
export default function fetch(url, config = { method: 'GET' }) {
  return new Promise(function(resolve, reject) {
    if (url && config.method === 'PUT') {
      resolve({
        body: JSON.parse(config.body),
        message: 'Successfully updated'
      });
    }
    if (url && config.method === 'GET') {
      resolve({ json: () => dataForGet });
    }
    reject('failed');
  });
}
