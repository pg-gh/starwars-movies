import React from 'react';
import styled from 'styled-components';

const TOTAL_STARS = 10;

const StarContainer = styled.div`
  display: flex;
  justify-content: start;
`;

const Star = styled.span`
  color: ${(props) => (props.filled === 'true' ? '#FFD700' : '#D3D3D3')};
  font-size: 1.5rem;
  margin-right: 5px;
`;

const StarRating = ({ rating }) => {
  // Round the rating to the nearest integer to represent full stars
  const filledStars = Math.round(rating);

  return (
    <StarContainer>
      {[...Array(TOTAL_STARS)].map((_, index) => {
        // Determine whether this star is filled or empty
        const starValue = index + 1;
        return (
          <Star
            key={index}
            filled={starValue <= filledStars ? 'true' : 'false'}
          >
            {starValue <= filledStars ? '★' : '☆'}
          </Star>
        );
      })}
    </StarContainer>
  );
};

export default StarRating;
