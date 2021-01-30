import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NewUser from '..';

describe('NewUser', () => {
  it('renders the page', () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <NewUser />
      </MemoryRouter>
    );

    expect(getByText('Create a User')).toBeInTheDocument();
    expect(getByText('Please fill out all form fields below.')).toBeInTheDocument();
    expect(container.querySelectorAll('input').length).toBeGreaterThan(0);
  });
});
