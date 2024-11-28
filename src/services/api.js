import axios from 'axios';

const SWAPI_BASE_URL = 'https://swapi.dev/api/films/?format=json';
const OMDBAPI_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = 'b9a5e69d';

export const fetchMovies = async () => {
  try {
    const response = await axios.get(SWAPI_BASE_URL);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const fetchMovieRatings = async (title) => {
  try {
    const response = await axios.get(
      `${OMDBAPI_BASE_URL}?t=${title}&apikey=${API_KEY}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie ratings:', error);
    return null;
  }
};
