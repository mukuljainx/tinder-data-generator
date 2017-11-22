/**
 * Main Component - index
 * @author ayusharma
 */
jest.mock('../../app/web/api');
import React from 'react';
import { mount } from 'enzyme';
import APIService from '../../app/web/api';
import Profile from '../../app/web/components/Profile';
import config from '../../app/web/config';

const API = new APIService(config);

describe('<Profile /> component', () => {
  let wrapper;
  it('should check the state for component will mount', () => {
    wrapper = mount(<Profile />);
    API.GET('http://example.com/api/profiles')
      .then(() => {
        expect(wrapper.state()).toEqual({
          loaded: false,
          loading: true,
          data: {}
        });
        wrapper.update();
      })
      .then(() => {
        expect(wrapper.state()).toEqual({
          loaded: true,
          loading: false,
          data: {
            name: 'rose',
            age: '14',
            bio: 'bio',
            images: {
              src: 'http://example.com/image.jpg',
              uuid: 'c2f6a139-f07e-4451-a295-567bbe8b8fce',
              _id: '5a0df128739e805d9e6d9355',
              score: [1]
            }
          }
        });
      })
      .catch(err => console.log(err));
  });

  it('should set rate and load the new data', () => {
    const onRate = wrapper.instance().onRate;
    return onRate(5)
      .then(res => {
        wrapper.update();
        return res;
      })
      .then(res => {
        expect(wrapper.state()).toEqual(res);
      });
  });
});
