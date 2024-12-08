import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarRating from './StarRating';

describe('StarRating Component', () => {
  test('renders the correct number of filled stars', () => {
    render(<StarRating rating={5} />);
    const filledStars = screen.getAllByText('★');
    expect(filledStars.length).toBe(5);
  });

  test('renders the correct number of empty stars', () => {
    render(<StarRating rating={5} />);
    const emptyStars = screen.getAllByText('☆');
    expect(emptyStars.length).toBe(5);
  });

  test('rounds the rating to the nearest integer', () => {
    render(<StarRating rating={4.6} />);
    const filledStars = screen.getAllByText('★');
    expect(filledStars.length).toBe(5);
  });

  test('renders all filled stars when rating is maximum', () => {
    render(<StarRating rating={10} />);
    const filledStars = screen.getAllByText('★');
    expect(filledStars.length).toBe(10);
  });
});
