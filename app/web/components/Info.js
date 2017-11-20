import React from 'react';
import PropTypes from 'prop-types';

/**
 * Info component
 * @param {object} props
 * @returns {JSX}
 */
const Info = ({ name, age, bio, about }) => {
  return (
    <ul>
      <li>
        {name} {age}
      </li>
      <li>{about}</li>
      <li>{bio}</li>
    </ul>
  );
};

Info.PropTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired
};

export default Info;
