import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieList from './MovieList';

describe('MovieList Component', () => {
  const movies = [
    { episode_id: 1, title: 'The Phantom Menace' },
    { episode_id: 2, title: 'Attack of the Clones' },
  ];

  test('renders movie titles', () => {
    render(<MovieList movies={movies} onMovieSelect={() => {}} />);
    movies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  test('calls onMovieSelect when a movie is clicked', () => {
    const onMovieSelect = jest.fn();
    render(<MovieList movies={movies} onMovieSelect={onMovieSelect} />);

    movies.forEach((movie) => {
      fireEvent.click(screen.getByText(movie.title));
      expect(onMovieSelect).toHaveBeenCalledWith(movie);
    });
  });
});
