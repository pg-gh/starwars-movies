import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

jest.useFakeTimers();

describe('SearchBar Component', () => {
  test('renders input element', () => {
    render(<SearchBar setSearchTerm={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/search movies.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls setSearchTerm after typing', () => {
    const setSearchTermMock = jest.fn();
    render(<SearchBar setSearchTerm={setSearchTermMock} />);
    const inputElement = screen.getByPlaceholderText(/search movies.../i);

    fireEvent.change(inputElement, { target: { value: 'Star Wars' } });

    expect(setSearchTermMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(setSearchTermMock).toHaveBeenCalledWith('Star Wars');
  });

  test('clears timeout on unmount', () => {
    const setSearchTermMock = jest.fn();
    const { unmount } = render(<SearchBar setSearchTerm={setSearchTermMock} />);
    const inputElement = screen.getByPlaceholderText(/search movies.../i);

    fireEvent.change(inputElement, { target: { value: 'Star Wars' } });

    unmount();

    jest.advanceTimersByTime(500);

    expect(setSearchTermMock).not.toHaveBeenCalled();
  });
});
