import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { useMediaQuery } from 'react-responsive';
import Header from '..';

jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn()
}));

describe('Header', () => {
  it('renders the page title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(getByText('MUI User Management')).toBeInTheDocument();
  });

  it('renders the desktop menu bar', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    const { getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(getByTestId('desktop-menu')).toBeInTheDocument();
  });

  it('renders the mobile menu drawer', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);
    const { getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('icon-button'));
    expect(getByTestId('mobile-menu')).toBeInTheDocument();
  });
});
