import React from 'react';
import styled from 'styled-components';
import { getPosterUrl, calculateAverageRating } from '../utils';
import StarRating from './StarRating';

const DetailsContainer = styled.div`
  padding: 1em;
`;

const Poster = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const DefaultText = styled.p`
  color: #888;
  font-style: italic;
`;

const RatingsContainer = styled.div`
  margin-top: 1em;
  background: #fafafa;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const MovieDetails = ({ movie }) => {
  if (!movie) {
    return <DefaultText>Select a movie to see the details</DefaultText>;
  }

  const fallbackPoster = 'https://via.placeholder.com/200x300?text=No+Image';
  const posterUrl = getPosterUrl(movie?.ratings?.Poster, fallbackPoster);
  const averageRating = calculateAverageRating(movie?.ratings?.Ratings || []);

  return (
    <DetailsContainer>
      <Poster src={posterUrl} alt={`${movie.title} Poster`} />
      <h2>{movie.title}</h2>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>{movie.opening_crawl}</p>
      {movie.ratings?.Ratings && (
        <RatingsContainer>
          <h3>Ratings:</h3>
          {movie.ratings.Ratings.map((r, index) => (
            <p key={index}>
              {r.Source}: {r.Value}
            </p>
          ))}
          <p>
            <strong>Average Rating:</strong> {averageRating}/10
          </p>
          {/* Display star rating */}
          <StarRating rating={parseFloat(averageRating)} />
        </RatingsContainer>
      )}
    </DetailsContainer>
  );
};

export default MovieDetails;
