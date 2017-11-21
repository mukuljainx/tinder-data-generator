/**
 * Reload component
 * @author ayusharma
 */

import { shallow } from 'enzyme';
import Reload from '../../app/web/components/Reload';
import React from 'react';
import { wrap } from 'module';

describe('<Reload /> UI comonent', () => {
  it('should render a button', () => {
    const wrapper = shallow(<Reload />);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('button text should be relaod', () => {
    const wrapper = shallow(<Reload />);
    expect(wrapper.find('button').text()).toMatch('Reload');
  });

  it('invokes click on reload button', () => {
    const _click = jest.fn();
    const wrapper = shallow(<Reload onClick={_click} />);
    wrapper.find('button').simulate('click');
    expect(_click).toBeCalled();
  });
});
