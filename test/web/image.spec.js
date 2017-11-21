/**
 * Image component
 * @author ayusharma
 */
import React from 'react';
import { shallow } from 'enzyme';

import Image from '../../app/web/components/Image';

describe('<Image /> component', () => {
  it('image count should be 1', () => {
    const props = {
      source: 'http://example.com/image.jpg'
    };
    const wrapper = shallow(<Image {...props} />);
    expect(wrapper.find('img').length).toBe(1);
  });

  it('should match exact html', () => {
    const props = { source: 'http://example.com/image.jpg' };
    const wrapper = shallow(<Image {...props} />);
    expect(wrapper.html()).toMatch(
      '<img src="http://example.com/image.jpg" width="400" height="400" alt="profile"/>'
    );
  });
});
