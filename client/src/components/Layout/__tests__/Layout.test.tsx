import React from 'react';
import { render } from '@testing-library/react';
import Layout from '..';

describe('Layout', () => {
  it('renders the children', () => {
    const { getByText } = render(<Layout className="test">hello world</Layout>);

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
