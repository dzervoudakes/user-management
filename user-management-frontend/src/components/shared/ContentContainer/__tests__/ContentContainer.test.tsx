import React from 'react';
import { render } from '@testing-library/react';
import ContentContainer from '..';

describe('ContentContainer', () => {
  it('renders', () => {
    const { getByText } = render(
      <ContentContainer className="test">hello world</ContentContainer>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
