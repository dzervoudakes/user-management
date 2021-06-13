import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { dynamicImport } from '..';

describe('dynamicImport', () => {
  const ImportedComponent = dynamicImport(
    () => import(/* webpackChunkName: 'test' */ '../__mocks__/MockImportedComponent')
  );

  it('Loads an external component and displays a loading indicator as a fallback', async () => {
    render(<ImportedComponent />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-indicator'));

    expect(screen.getByText('imported component')).toBeInTheDocument();
  });
});
