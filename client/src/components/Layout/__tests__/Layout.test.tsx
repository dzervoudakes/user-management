import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '..';

describe('Layout', () => {
  it('renders the children', () => {
    render(<Layout className="test">hello world</Layout>);

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
