import React from 'react';
import PropTypes from 'prop-types';

/**
 * Info component
 * @param {object} props
 * @returns {JSX}
 */
const Info = ({ name = 'Name', age = 14, bio = 'bio', about = 'about' }) => {
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
  name: PropTypes.string,
  age: PropTypes.string,
  bio: PropTypes.string,
  about: PropTypes.string
};

export default Info;
