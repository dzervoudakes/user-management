import React from 'react';
import { render } from '@testing-library/react';
import SectionHeader from '..';

describe('SectionHeader', () => {
  it('renders the title and description', () => {
    const { getByText } = render(
      <SectionHeader title="Title" description="Description" />
    );

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
  });
});
