import React from 'react';
import { render } from '@testing-library/react';
import Providers from '..';

describe('Providers', () => {
  it('renders', () => {
    const { getByText } = render(
      <Providers>
        <div>Foo</div>
      </Providers>
    );

    expect(getByText('Foo')).toBeInTheDocument();
  });
});
