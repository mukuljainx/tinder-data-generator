import React from 'react';
import PropTypes from 'prop-types';

/**
 * Image component
 * @param {object} source
 * @returns {JSX}
 */
const ImageComponent = ({ source = '' }) => {
  return <img src={source} width="400" height="400" alt="profile" />;
};

ImageComponent.PropTypes = {
  source: PropTypes.string.isRequired
};

export default ImageComponent;
