import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ToastContext } from '@src/context';
import { useToast } from '..';

describe('useToast', () => {
  const TestComponent: React.FC = ({ children }) => {
    const isToastOpen = false;
    const message = 'foo';
    const variant = 'success';
    const openToast = jest.fn();
    const closeToast = jest.fn();

    return (
      <ToastContext.Provider
        value={{ isToastOpen, message, variant, openToast, closeToast }}
      >
        {children}
      </ToastContext.Provider>
    );
  };

  it('returns the current value of ToastContext', () => {
    const { result } = renderHook(() => useToast(), { wrapper: TestComponent });
    const { isToastOpen, message, variant } = result.current;

    expect(isToastOpen).toBe(false);
    expect(message).toBe('foo');
    expect(variant).toBe('success');
  });
});
