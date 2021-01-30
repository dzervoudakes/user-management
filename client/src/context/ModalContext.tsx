/**
 * Handle state of the Modal component.
 * @packageDocumentation
 */
import React, { createContext, useState } from 'react';
import noop from 'lodash/noop';

const defaultModalContent = {
  title: '',
  message: '',
  action: noop
};

export interface ModalContent {
  title: string;
  message: string;
  action: () => void;
}

export interface ModalContextProps {
  isModalOpen: boolean;
  modalContent: ModalContent;
  openModal: ({ title, message, action }: ModalContent) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
  isModalOpen: false,
  modalContent: defaultModalContent,
  openModal: noop,
  closeModal: noop
});

export const ModalProvider: React.FC = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>(defaultModalContent);

  const openModal = (modalProps: ModalContent): void => {
    setIsModalOpen(true);
    setModalContent(modalProps);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setModalContent(defaultModalContent);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
