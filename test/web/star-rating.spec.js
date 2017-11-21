/**
 * Star Rating component
 * @author ayusharma
 */
import React from 'react';
import { shallow } from 'enzyme';

import StarRating from '../../app/web/components/StarRating';

describe('<StarRating /> component', () => {
  it('should render 5 stars', () => {
    const props = {
      totalStars: 5
    };
    const wrapper = shallow(<StarRating {...props} />);
    expect(wrapper.find('Star').length).toBe(5);
  });

  it('should select 2 stars', () => {
    const props = { totalStars: 5, starsSelected: 2 };
    const wrapper = shallow(<StarRating {...props} />);
    const selected = wrapper
      .find('Star')
      .map(n => n.prop('selected'))
      .filter(p => p === true);
    expect(selected.length).toBe(2);
  });
});
