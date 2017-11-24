/**
 * API mocks
 * @author ayusharma
 */
/**
 * API class mock
 */
class API {
  /**
   * constructor
   * @param {*} config
   */
  constructor(config) {}
  /**
   * GET
   * @returns {promise}
   */
  GET() {
    return new Promise(function(resolve, reject) {
      const data = {
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
      resolve({ json: () => data });
    });
  }
  /**
   * PUT
   * @returns {promise}
   */
  PUT() {
    return new Promise(function(resolve, reject) {
      const data = {
        name: 'rose',
        age: '14',
        bio: 'bio',
        images: {
          src: 'http://example.com/image.jpg',
          uuid: 'c2f6a139-f07e-4451-a295-567bbe8b8fce',
          _id: '5a0df128739e805d9e6d9355',
          score: [1, 2]
        }
      };
      resolve({ json: () => data });
    });
  }
}

export default API;
