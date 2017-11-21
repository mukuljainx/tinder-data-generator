/**
 * Star component
 * @author ayusharma
 */
import React from 'react';
import { shallow } from 'enzyme';

import Star from '../../app/web/components/Star';

describe('<Star /> comoponent', () => {
  it('element shoule be 1', () => {
    const wrapper = shallow(<Star />);
    expect(wrapper.find('i').length).toBe(1);
  });

  it('should select the star', () => {
    const wrapper = shallow(<Star selected={true} />);
    expect(wrapper.find('i.star.selected').length).toBe(1);
  });

  it('should deselect the star', () => {
    const wrapper = shallow(<Star selected={false} />);
    expect(wrapper.find('i.star.selected').length).toBe(0);
  });

  it('shoule enable click on star', () => {
    const _click = jest.fn();
    const wrapper = shallow(<Star onClick={_click} />);
    wrapper.find('i').simulate('click');
    expect(_click).toBeCalled();
  });
});
