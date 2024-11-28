import React from 'react';
import styled from 'styled-components';

const Dropdown = styled.select`
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
`;

const SortDropdown = ({ sortOption, setSortOption }) => (
  <Dropdown value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
    <option value="Year">Year</option>
    <option value="Episode">Episode</option>
  </Dropdown>
);

export default SortDropdown;
