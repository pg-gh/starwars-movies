import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 97%;
  padding: 0.5em;
  margin-bottom: 1em;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
`;

const SearchBar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputValue, setSearchTerm]);

  return (
    <Input
      type="text"
      placeholder="Search movies..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default SearchBar;
