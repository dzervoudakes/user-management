/**
 * Hook into the ModalContext.
 * @packageDocumentation
 */
import { useContext } from 'react';

import { ModalContext, ModalContextProps } from '@src/context';

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);

  /* istanbul ignore if */
  if (context === undefined) {
    throw new Error('useModal must be used with a ModalProvider.');
  }

  return context;
};

export default useModal;
