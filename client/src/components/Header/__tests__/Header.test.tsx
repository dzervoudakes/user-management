import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from '..';

jest.mock('@material-ui/core/useMediaQuery');

describe('Header', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('User Management')).toBeInTheDocument();
  });

  it('renders the desktop menu bar', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId('desktop-menu')).toBeInTheDocument();
  });

  it('renders the mobile menu drawer', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('icon-button'));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });
});
