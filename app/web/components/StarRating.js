import React from 'react';
import Star from './Star';
import './star.scss';

const StarRating = ({ starsSelected = 0, totalStars = 5, onRate = f => f }) => (
  <div className="rating">
    {console.log(starsSelected)}
    {[...Array(totalStars)].map((e, i) => (
      <Star
        key={i}
        selected={i < starsSelected}
        onClick={() => onRate(totalStars - i)}
      />
    ))}
    <br />
  </div>
);

export default StarRating;
