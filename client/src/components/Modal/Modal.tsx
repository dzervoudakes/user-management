import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';
import { useModal } from '@src/hooks';
import './Modal.scss';

const Modal: React.FC = () => {
  const { isModalOpen, modalContent, closeModal } = useModal();
  const { title, message, action } = modalContent;

  return (
    <Dialog onBackdropClick={closeModal} open={isModalOpen} classes={{ paper: 'dialog' }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={action} color="primary">
          Proceed
        </Button>
        <Button onClick={closeModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
