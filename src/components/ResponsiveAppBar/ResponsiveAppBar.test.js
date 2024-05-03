import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResponsiveAppBar from './ResponsiveAppBar';

describe('<ResponsiveAppBar />', () => {
  test('it should mount', () => {
    render(<ResponsiveAppBar />);
    
    const responsiveAppBar = screen.getByTestId('ResponsiveAppBar');

    expect(responsiveAppBar).toBeInTheDocument();
  });
});