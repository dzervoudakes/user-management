import React from 'react';
import { render } from '@testing-library/react';
import LoadingIndicator from '..';

describe('LoadingIndicator', () => {
  it('renders', () => {
    const { getByTestId } = render(<LoadingIndicator testid="loading-indicator" />);

    expect(getByTestId('loading-indicator')).toBeInTheDocument();
  });
});
