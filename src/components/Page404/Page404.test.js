import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Page404 from './Page404';

describe('<Page404 />', () => {
  test('it should mount', () => {
    render(<Page404 />);
    
    const page404 = screen.getByTestId('Page404');

    expect(page404).toBeInTheDocument();
  });
});