import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortDropdown from './SortDropdown';

describe('SortDropdown Component', () => {
  const setSortOption = jest.fn();

  test('renders SortDropdown with default value', () => {
    render(<SortDropdown sortOption="Year" setSortOption={setSortOption} />);
    const dropdown = screen.getByTestId('sort-dropdown');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.value).toBe('Year');
  });

  test('changes value when a new option is selected', () => {
    render(<SortDropdown sortOption="Year" setSortOption={setSortOption} />);
    const dropdown = screen.getByTestId('sort-dropdown');
    fireEvent.change(dropdown, { target: { value: 'Episode' } });
    expect(setSortOption).toHaveBeenCalledWith('Episode');
  });
});
