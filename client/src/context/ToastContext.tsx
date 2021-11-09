/**
 * Handle state of the Toast component.
 * @packageDocumentation
 */
import { createContext, useState } from 'react';

import noop from 'lodash/noop';

export type ToastVariant = 'error' | 'info' | 'success' | 'warning';

export interface OpenToast {
  variant: ToastVariant;
  message: string;
}

export interface ToastContextProps {
  isToastOpen: boolean;
  toastMessage: string;
  toastVariant: ToastVariant;
  openToast: ({ variant, message }: OpenToast) => void;
  closeToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  isToastOpen: false,
  toastMessage: '',
  toastVariant: 'info',
  openToast: noop,
  closeToast: noop
});

export const ToastProvider: React.FC = ({ children }) => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<ToastVariant>('info');

  const openToast = ({ variant, message }: OpenToast): void => {
    setIsToastOpen(true);
    setToastVariant(variant);
    setToastMessage(message);
  };

  const closeToast = (): void => {
    setIsToastOpen(false);
    setToastVariant('info');
    setToastMessage('');
  };

  return (
    <ToastContext.Provider
      value={{ isToastOpen, toastMessage, toastVariant, openToast, closeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
