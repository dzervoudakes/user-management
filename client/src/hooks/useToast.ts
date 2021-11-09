/**
 * Hook into the ToastContext.
 * @packageDocumentation
 */
import { useContext } from 'react';

import { ToastContext, ToastContextProps } from '@src/context';

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);

  /* istanbul ignore if */
  if (context === undefined) {
    throw new Error('useToast must be used with a ToastProvider.');
  }

  return context;
};

export default useToast;
