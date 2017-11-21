/**
 * Main Component - index
 * @author ayusharma
 */
jest.mock('isomorphic-fetch');
import React from 'react';
import { mount } from 'enzyme';
import fetch from 'isomorphic-fetch';

import Profile from '../../app/web/components/Profile';

describe('<Profile /> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Profile />);

    fetch('http://example.com/api/profiles')
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
      });
  });

  it('should set rate the image with correct body', () => {
    const onRate = wrapper.instance().onRate;
    return onRate(5).then(res => {
      expect(res.body).toEqual({
        id: '5a0df128739e805d9e6d9355',
        score: [1, 5]
      });
    });
  });

  it('should set rate the image with correct message', () => {
    const onRate = wrapper.instance().onRate;
    return onRate(5).then(res => {
      expect(res.message).toEqual('Successfully updated');
    });
  });
});
