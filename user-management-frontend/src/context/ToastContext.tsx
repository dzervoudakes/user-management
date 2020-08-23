/**
 * Handle state of reusable Toast component.
 * @packageDocumentation
 */
import React, { createContext, useState } from 'react';
import noop from 'lodash/noop';

export type ToastVariant = 'error' | 'info' | 'success' | 'warning';

export interface ToastContextProps {
  isToastOpen: boolean;
  message: string;
  variant: ToastVariant;
  openToast: (toastVariant: ToastVariant, toastMessage: string) => void;
  closeToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  isToastOpen: false,
  message: '',
  variant: 'info',
  openToast: noop,
  closeToast: noop
});

export const ToastProvider: React.FC = ({ children }) => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<ToastVariant>('info');

  const openToast = (toastVariant: ToastVariant, toastMessage: string): void => {
    setIsToastOpen(true);
    setVariant(toastVariant);
    setMessage(toastMessage);
  };

  const closeToast = (): void => {
    setIsToastOpen(false);
    setVariant('info');
    setMessage('');
  };

  return (
    <ToastContext.Provider
      value={{ isToastOpen, message, variant, openToast, closeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
