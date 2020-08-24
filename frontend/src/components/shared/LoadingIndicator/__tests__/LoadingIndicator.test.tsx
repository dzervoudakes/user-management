import React from 'react';
import { render } from '@testing-library/react';
import LoadingIndicator from '..';

describe('LoadingIndicator', () => {
  it('renders the loading state', () => {
    const { getByTestId } = render(<LoadingIndicator />);

    expect(getByTestId('loading-indicator')).toBeInTheDocument();
  });
});
