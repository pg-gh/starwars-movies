import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 0.5em;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`;

const MovieList = ({ movies, onMovieSelect }) => (
  <List>
    {movies.map((movie) => (
      <ListItem key={movie.episode_id} onClick={() => onMovieSelect(movie)}>
        {movie.title}
      </ListItem>
    ))}
  </List>
);

export default MovieList;
