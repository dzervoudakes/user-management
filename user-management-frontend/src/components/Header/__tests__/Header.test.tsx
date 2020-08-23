import React from 'react';
import { render } from '@testing-library/react';
import Header from '..';

describe('Header', () => {
  it('renders the page title', () => {
    const { getByText } = render(<Header />);

    expect(getByText('AnonCorp User Management')).toBeInTheDocument();
  });
});
