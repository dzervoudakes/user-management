import { render, screen } from '@testing-library/react';

import LoadingIndicator from '..';

describe('LoadingIndicator', () => {
  it('renders the loading state', () => {
    render(<LoadingIndicator />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });
});
