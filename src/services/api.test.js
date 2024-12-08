import axios from 'axios';
import { fetchMovies, fetchMovieRatings } from './api';

jest.mock('axios');

describe('API Service', () => {
  describe('fetchMovies', () => {
    it('should fetch movies successfully', async () => {
      const movies = [{ title: 'A New Hope' }];
      axios.get.mockResolvedValue({ data: { results: movies } });

      const result = await fetchMovies();
      expect(result).toEqual(movies);
    });

    it('should return an empty array when there is an error', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'));

      const result = await fetchMovies();
      expect(result).toEqual([]);
    });
  });

  describe('fetchMovieRatings', () => {
    it('should fetch movie ratings successfully', async () => {
      const ratings = { Title: 'A New Hope', imdbRating: '8.6' };
      axios.get.mockResolvedValue({ data: ratings });

      const result = await fetchMovieRatings('A New Hope');
      expect(result).toEqual(ratings);
    });

    it('should return null when there is an error', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'));

      const result = await fetchMovieRatings('A New Hope');
      expect(result).toBeNull();
    });
  });
});
