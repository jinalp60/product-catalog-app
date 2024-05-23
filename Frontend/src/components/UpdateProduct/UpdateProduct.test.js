import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateProduct from './UpdateProduct';

describe('<UpdateProduct />', () => {
  test('it should mount', () => {
    render(<UpdateProduct />);
    
    const updateProduct = screen.getByTestId('UpdateProduct');

    expect(updateProduct).toBeInTheDocument();
  });
});