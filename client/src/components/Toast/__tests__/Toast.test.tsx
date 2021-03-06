import React from 'react';
import { render } from '@testing-library/react';
import { ToastContext } from '@src/context';
import Toast from '..';

describe('Toast', () => {
  const MockToastProvider: React.FC = ({ children }) => (
    <ToastContext.Provider
      value={{
        isToastOpen: true,
        toastVariant: 'success',
        toastMessage: 'Success',
        openToast: jest.fn(),
        closeToast: jest.fn()
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
