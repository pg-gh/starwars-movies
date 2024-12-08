import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieDetails from './MovieDetails';
import { getPosterUrl, calculateAverageRating } from '../utils';

jest.mock('../utils');

describe('MovieDetails Component', () => {
  const mockMovie = {
    title: 'A New Hope',
    release_date: '1977-05-25',
    director: 'George Lucas',
    opening_crawl: 'It is a period of civil war...',
    ratings: {
      Poster: 'some-poster-url.jpg',
      Ratings: [
        { Source: 'Internet Movie Database', Value: '8.6/10' },
        { Source: 'Rotten Tomatoes', Value: '92%' },
      ],
    },
  };

  beforeEach(() => {
    getPosterUrl.mockReturnValue('some-poster-url.jpg');
    calculateAverageRating.mockReturnValue('8.9');
  });

  it('renders without crashing', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
  });

  it('displays fallback text when no movie is selected', () => {
    render(<MovieDetails movie={null} />);
    expect(
      screen.getByText('Select a movie to see the details'),
    ).toBeInTheDocument();
  });

  it('uses fallback poster when no poster is provided', () => {
    getPosterUrl.mockReturnValue(
      'https://via.placeholder.com/200x300?text=No+Image',
    );
    render(
      <MovieDetails
        movie={{
          ...mockMovie,
          ratings: { ...mockMovie.ratings, Poster: null },
        }}
      />,
    );
    expect(screen.getByAltText('A New Hope Poster').src).toBe(
      'https://via.placeholder.com/200x300?text=No+Image',
    );
  });
});
