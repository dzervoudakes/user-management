import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Routes from '..';

describe('Routes', () => {
  it('renders home page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
    );

    expect(getByText('Current Users')).toBeInTheDocument();
  });

  it('renders new user page', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/new-user']}>
        <Routes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText('Create a User')).toBeInTheDocument();
    });
  });

  it('renders the 404 page', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/missing']}>
        <Routes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("That's a 404")).toBeInTheDocument();
    });
  });
});
