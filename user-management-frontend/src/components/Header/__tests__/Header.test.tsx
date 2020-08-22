import React from 'react';
import { render } from '@testing-library/react';
import Header from '..';

describe('Header', () => {
  it('renders', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Oh, hello...')).toBeInTheDocument();
  });
});
