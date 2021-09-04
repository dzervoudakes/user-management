import { render, fireEvent, screen } from '@testing-library/react';
import { ToastContext, ToastProvider } from '..';

describe('ToastContext', () => {
  const TestComponent: React.FC = () => (
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

  const Wrapper: React.FC = () => (
    <ToastProvider>
      <TestComponent />
    </ToastProvider>
  );

  it('provides the current state of the toast', () => {
    render(<Wrapper />);

    fireEvent.click(screen.getByText('open toast'));

    expect(screen.getByText('isToastOpen: true')).toBeInTheDocument();
    expect(screen.getByText('message: There was a warning.')).toBeInTheDocument();
    expect(screen.getByText('variant: warning')).toBeInTheDocument();
  });

  it('closes the toast', () => {
    render(<Wrapper />);

    fireEvent.click(screen.getByText('open toast'));
    expect(screen.getByText('isToastOpen: true')).toBeInTheDocument();

    fireEvent.click(screen.getByText('close toast'));
    expect(screen.getByText('isToastOpen: false')).toBeInTheDocument();
  });
});
