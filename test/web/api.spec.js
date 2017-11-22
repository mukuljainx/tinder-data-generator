/**
 * API service test case
 * @author ayusharma
 */
jest.mock('isomorphic-fetch');
import APIService from '../../app/web/api';
import config from '../../app/web/config';
import { getUrl } from '../../app/web/api';

const API = new APIService(config);

describe('API Service', () => {
  it('should get data using GET method', () => {
    API.GET('/api/profiles')
      .then(res => {
        return res.json();
      })
      .then(data => {
        expect(data).toEqual({ test: 'something' });
      });
  });
  it('should post data using POST method and get same body', () => {
    API.POST('/api/profiles', { body: { test: 'something' } })
      .then(res => {
        return res.json();
      })
      .then(data => {
        expect(data).toEqual({ test: 'something' });
      });
  });

  it('should post data using PUT method and get same body', () => {
    API.PUT('/api/profiles', { body: { test: 'something' } })
      .then(res => {
        return res.json();
      })
      .then(data => {
        expect(data).toEqual({ test: 'something' });
      });
  });
  it('should post data using PATCH method and get same body', () => {
    API.PATCH('/api/profiles', { body: { test: 'something' } })
      .then(res => {
        return res.json();
      })
      .then(data => {
        expect(data).toEqual({ test: 'something' });
      });
  });
  it('should post data using DELETE method and get same body', () => {
    API.DELETE('/api/profiles', { body: { test: 'something' } })
      .then(res => {
        return res.json();
      })
      .then(data => {
        expect(data).toEqual({});
      });
  });

  it('should throw an error for api config', () => {
    expect(() => new APIService({})).toThrowError();
  });
  it('should give correct url - 1', () => {
    expect(getUrl('http://example.com', 'http://exmaple.com/api')).toEqual(
      'http://exmaple.com/api'
    );
  });

  it('should give correct url - 2', () => {
    expect(getUrl('http://example.com', '/api')).toEqual(
      'http://example.com/api'
    );
  });
});
