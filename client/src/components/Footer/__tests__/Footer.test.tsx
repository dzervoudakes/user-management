import React from 'react';
import { render } from '@testing-library/react';
import Footer from '..';

describe('Footer', () => {
  it('renders the copyright info', () => {
    const { getByText } = render(<Footer />);

    expect(
      getByText(`Copyright © ${new Date().getFullYear()} MUI User Management`)
    ).toBeInTheDocument();
  });
});
