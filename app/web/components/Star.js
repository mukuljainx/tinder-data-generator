import React from 'react';
import propTypes from 'prop-types';

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

Star.propTypes = {
  selected: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired
};

export default Star;
