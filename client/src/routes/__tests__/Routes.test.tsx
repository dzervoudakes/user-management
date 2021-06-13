import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Routes from '..';

describe('Routes', () => {
  it('renders the home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
    );

    expect(screen.getByText('Current Users')).toBeInTheDocument();
  });

  it('renders the new user page', async () => {
    render(
      <MemoryRouter initialEntries={['/new-user']}>
        <Routes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Create a User')).toBeInTheDocument();
    });
  });

  it('renders the 404 page', async () => {
    render(
      <MemoryRouter initialEntries={['/missing']}>
        <Routes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("That's a 404")).toBeInTheDocument();
    });
  });
});
