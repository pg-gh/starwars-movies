import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { fetchMovies, fetchMovieRatings } from '../services/api';

jest.mock('../services/api');

describe('App Component', () => {
  const mockMovies = [
    { title: 'A New Hope', release_date: '1977-05-25', episode_id: 4 },
    {
      title: 'The Empire Strikes Back',
      release_date: '1980-05-21',
      episode_id: 5,
    },
  ];

  const mockRatings = { rating: 8.7 };

  beforeEach(() => {
    fetchMovies.mockResolvedValue(mockMovies);
    fetchMovieRatings.mockResolvedValue(mockRatings);
  });

  test('renders loading text initially', () => {
    render(<App />);
    expect(screen.getByText(/loading movies/i)).toBeInTheDocument();
  });

  test('renders movie list after fetching movies', async () => {
    render(<App />);
    await waitFor(() => expect(fetchMovies).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/a new hope/i)).toBeInTheDocument();
    expect(screen.getByText(/the empire strikes back/i)).toBeInTheDocument();
  });

  test('filters movies based on search term', async () => {
    render(<App />);
    await waitFor(() => expect(fetchMovies).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'hope' },
    });

    await waitFor(() =>
      expect(
        screen.queryByText(/the empire strikes back/i),
      ).not.toBeInTheDocument(),
    );
    await screen.findByText(/a new hope/i);
  });

  test('sorts movies based on selected option', async () => {
    render(<App />);
    await waitFor(() => expect(fetchMovies).toHaveBeenCalledTimes(1));
    fireEvent.change(screen.getByTestId('sort-dropdown'), {
      target: { value: 'Episode' },
    });
    const movieTitles = screen
      .getAllByTestId('movie-title')
      .map((node) => node.textContent);
    expect(movieTitles).toEqual(['A New Hope', 'The Empire Strikes Back']);
  });
});
