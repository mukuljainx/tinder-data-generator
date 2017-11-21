import React from 'react';
import Star from './Star';
import PropTypes from 'prop-types';
import './star.scss';

/**
 * StarRating Component
 * @param {object} props
 * @returns {JSX}
 */
const StarRating = ({ starsSelected = 0, totalStars = 5, onRate = f => f }) => (
  <div className="rating">
    {[...Array(totalStars)].map((e, i) => (
      <Star
        key={i}
        selected={i < starsSelected}
        onClick={() => onRate(totalStars - i)}
      />
    ))}
  </div>
);

StarRating.PropTypes = {
  starsSelected: PropTypes.number,
  totalStars: PropTypes.number,
  onRate: PropTypes.func
};
export default StarRating;
