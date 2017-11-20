import React from 'react';

const Reload = ({ onClick = f => f }) => {
  return <button onClick={onClick}>Reload</button>;
};

export default Reload;