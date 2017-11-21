import React from 'react';

/**
 * Reload component
 * @param {object} onClick
 * @returns {JSX}
 */
const Reload = ({ onClick = f => f }) => {
  return <button onClick={onClick}>Reload</button>;
};

export default Reload;
