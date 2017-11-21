/**
 * @author ayusharma
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Image component
 * @param {object} source
 * @returns {JSX}
 */
const ImageComponent = ({ source = '', width = 400, height = 400 }) => {
  return <img src={source} width={width} height={height} alt="profile" />;
};

ImageComponent.PropTypes = {
  source: PropTypes.string.isRequired
};

export default ImageComponent;
