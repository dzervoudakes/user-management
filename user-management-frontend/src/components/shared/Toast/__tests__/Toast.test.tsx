import React from 'react';
import { render } from '@testing-library/react';
import noop from 'lodash/noop';
import { ToastContext } from '@src/context';
import Toast from '..';

describe('Toast', () => {
  const MockToastProvider: React.FC = ({ children }) => (
    <ToastContext.Provider
      value={{
        isToastOpen: true,
        toastVariant: 'success',
        toastMessage: 'Success',
        openToast: noop,
        closeToast: noop
      }}
    >
      {children}
    </ToastContext.Provider>
  );

  const Wrapper: React.FC = () => (
    <MockToastProvider>
      <Toast />
    </MockToastProvider>
  );

  it('renders the given content', () => {
    const { getByText } = render(<Wrapper />);

    expect(getByText('Success')).toBeInTheDocument();
  });
});
