import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import dynamicImport from '..';

describe('dynamicImport', () => {
  const ImportedComponent = dynamicImport(
    () => import(/* webpackChunkName: 'test' */ '../__mocks__/MockImportedComponent')
  );

  it('Loads an external component and displays a loading indicator as a fallback', async () => {
    const { getByText, getByTestId } = render(<ImportedComponent />);

    expect(getByTestId('loading-indicator')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));

    expect(getByText('imported component')).toBeInTheDocument();
  });
});
