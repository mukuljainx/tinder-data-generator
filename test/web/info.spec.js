/**
 * Info component
 * @author ayusharma
 */
import React from 'react';
import { shallow } from 'enzyme';

import Info from '../../app/web/components/Info';

describe('<Info /> component', () => {
  it('should find one <ul> element', () => {
    const wrapper = shallow(<Info />);
    expect(wrapper.find('ul').length).toBe(1);
  });

  it('should find three <li> element', () => {
    const wrapper = shallow(<Info />);
    expect(wrapper.find('li').length).toBe(3);
  });

  it('should match exact html', () => {
    const props = {
      name: 'sam',
      age: 16,
      bio: 'bio',
      about: 'about'
    };
    const wrapper = shallow(<Info {...props} />);
    const html = '<ul><li>sam 16</li><li>about</li><li>bio</li></ul>';
    expect(wrapper.html()).toMatch(html);
  });
});
