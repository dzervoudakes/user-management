import { render, screen } from '@testing-library/react';

import SectionHeader from '..';

describe('SectionHeader', () => {
  it('renders the title and description', () => {
    render(<SectionHeader title="Title" description="Description" />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
