/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NewUser from '..';

describe('NewUser', () => {
  it('renders the page', () => {
    const { container } = render(
      <MemoryRouter>
        <NewUser />
      </MemoryRouter>
    );

    expect(screen.getByText('Create a User')).toBeInTheDocument();
    expect(
      screen.getByText('Please fill out all form fields below.')
    ).toBeInTheDocument();
    expect(container.querySelectorAll('input').length).toBeGreaterThan(0);
  });
});
