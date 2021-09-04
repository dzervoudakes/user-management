import { render, screen } from '@testing-library/react';
import Footer from '..';

describe('Footer', () => {
  it('renders the copyright info', () => {
    render(<Footer />);

    expect(
      screen.getByText(`Copyright © ${new Date().getFullYear()} User Management Corp.`)
    ).toBeInTheDocument();
  });
});
