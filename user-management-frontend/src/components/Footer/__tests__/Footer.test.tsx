import React from 'react';
import { render } from '@testing-library/react';
import Footer from '..';

describe('Footer', () => {
  it('renders', () => {
    const { getByText } = render(<Footer />);

    expect(getByText('GitHub')).toBeInTheDocument();
  });
});
