import React from 'react';
import { render } from '@testing-library/react';
import Layout from '..';

describe('Layout', () => {
  it('renders the child component', () => {
    const { getByText } = render(
      <Layout>
        <div>Child component</div>
      </Layout>
    );

    expect(getByText('Child component')).toBeInTheDocument();
  });
});
