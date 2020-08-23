import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ToastContext, ToastProvider } from '..';

describe('ToastContext', () => {
  const TestComponent: React.FC = () => {
    return (
      <ToastContext.Consumer>
        {({ isToastOpen, toastMessage, toastVariant, openToast, closeToast }) => (
          <div>
            <div>isToastOpen: {isToastOpen.toString()}</div>
            <div>message: {toastMessage}</div>
            <div>variant: {toastVariant}</div>
            <button
              onClick={() =>
                openToast({ variant: 'warning', message: 'There was a warning.' })
              }
              type="button"
            >
              open toast
            </button>
            <button onClick={closeToast} type="button">
              close toast
            </button>
          </div>
        )}
      </ToastContext.Consumer>
    );
  };

  const Wrapper: React.FC = () => (
    <ToastProvider>
      <TestComponent />
    </ToastProvider>
  );

  it('provides the current state of the reusable toast', () => {
    const { getByText } = render(<Wrapper />);

    fireEvent.click(getByText('open toast'));

    expect(getByText('isToastOpen: true')).toBeInTheDocument();
    expect(getByText('message: There was a warning.')).toBeInTheDocument();
    expect(getByText('variant: warning')).toBeInTheDocument();
  });

  it('closes the toast', () => {
    const { getByText } = render(<Wrapper />);

    fireEvent.click(getByText('open toast'));
    expect(getByText('isToastOpen: true')).toBeInTheDocument();

    fireEvent.click(getByText('close toast'));
    expect(getByText('isToastOpen: false')).toBeInTheDocument();
  });
});
