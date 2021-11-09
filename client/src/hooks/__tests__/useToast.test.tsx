import { renderHook } from '@testing-library/react-hooks';

import { ToastContext } from '@src/context';

import { useToast } from '..';

describe('useToast', () => {
  const TestComponent: React.FC = ({ children }) => {
    const isToastOpen = false;
    const toastMessage = 'Success';
    const toastVariant = 'success';
    const openToast = jest.fn();
    const closeToast = jest.fn();

    return (
      <ToastContext.Provider
        value={{ isToastOpen, toastMessage, toastVariant, openToast, closeToast }}
      >
        {children}
      </ToastContext.Provider>
    );
  };

  it('returns the current value of ToastContext', () => {
    const { result } = renderHook(() => useToast(), { wrapper: TestComponent });
    const { isToastOpen, toastMessage, toastVariant } = result.current;

    expect(isToastOpen).toBe(false);
    expect(toastMessage).toBe('Success');
    expect(toastVariant).toBe('success');
  });
});
