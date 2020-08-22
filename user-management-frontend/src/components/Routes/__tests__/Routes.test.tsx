import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Routes from '..';

describe('Routes', () => {
  it('renders home page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByText('Welcome to your new React App!')).toBeInTheDocument();
  });

  it('renders the 404 page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/missing']}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByText("That's a 404")).toBeInTheDocument();
  });
});
