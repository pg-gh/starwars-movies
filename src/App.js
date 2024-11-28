import React, { useState, useEffect, useMemo } from 'react';
import { fetchMovies, fetchMovieRatings } from './services/api';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f4f8;
`;

const Sidebar = styled.div`
  width: 30%;
  background: #fff;
  padding: 1em;
  border-right: 1px solid #ccc;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Details = styled.div`
  flex: 1;
  padding: 1em;
  background: #fff;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
`;

const LoadingText = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.2rem;
  font-style: italic;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Year');
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch movies once on load
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoadingMovies(true);
        const fetchedMovies = await fetchMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      } finally {
        setLoadingMovies(false);
      }
    };

    loadMovies();
  }, []);

  // Memoize filtered and sorted movies to avoid unnecessary recalculations
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [movies, searchTerm]);

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => {
      if (sortOption === 'Year')
        return new Date(a.release_date) - new Date(b.release_date);
      if (sortOption === 'Episode') return a.episode_id - b.episode_id;
      return 0;
    });
  }, [filteredMovies, sortOption]);

  const handleMovieSelect = async (movie) => {
    setLoadingDetails(true);
    const ratings = await fetchMovieRatings(movie.title);
    setSelectedMovie({ ...movie, ratings });
    setLoadingDetails(false);
  };

  return (
    <AppContainer>
      <Sidebar>
        <SearchBar setSearchTerm={setSearchTerm} />
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        {loadingMovies ? (
          <LoadingText>Loading movies...</LoadingText>
        ) : (
          <MovieList movies={sortedMovies} onMovieSelect={handleMovieSelect} />
        )}
      </Sidebar>
      <Details>
        {loadingDetails ? <Spinner /> : <MovieDetails movie={selectedMovie} />}
      </Details>
    </AppContainer>
  );
};

export default App;
