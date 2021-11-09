import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useModal } from '@src/hooks';

const useStyles = makeStyles(() => ({
  dialog: {
    width: '100%'
  }
}));

const Modal: React.FC = () => {
  const { isModalOpen, modalContent, closeModal } = useModal();
  const { title, message, action } = modalContent;
  const styles = useStyles();

  return (
    <Dialog
      onClose={(event, reason) => {
        if (reason === 'backdropClick') {
          closeModal();
        }
      }}
      open={isModalOpen}
      classes={{ paper: styles.dialog }}
    >
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
