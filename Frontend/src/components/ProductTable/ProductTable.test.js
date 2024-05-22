import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductTable from './ProductTable';

describe('<ProductTable />', () => {
  test('it should mount', () => {
    render(<ProductTable />);
    
    const productTable = screen.getByTestId('ProductTable');

    expect(productTable).toBeInTheDocument();
  });
});