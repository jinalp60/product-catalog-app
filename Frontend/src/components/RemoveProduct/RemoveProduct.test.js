import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RemoveProduct from './RemoveProduct';

describe('<RemoveProduct />', () => {
  test('it should mount', () => {
    render(<RemoveProduct />);
    
    const removeProduct = screen.getByTestId('RemoveProduct');

    expect(removeProduct).toBeInTheDocument();
  });
});