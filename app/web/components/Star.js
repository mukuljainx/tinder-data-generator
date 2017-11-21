/**
 * @author ayusharma
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Star
 * @param {boolean} selected
 * @param {function} onClick
 * @returns {element}
 */
const Star = ({ selected = false, onClick = f => f }) => (
  <i
    className={
      selected ? 'star selected material-icons' : 'material-icons star'
    }
    onClick={onClick}
  >
    star_rate
  </i>
);

Star.PropTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

export default Star;
