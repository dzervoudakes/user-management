import React from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { useToast } from '@src/hooks';

const Toast: React.FC = () => {
  const { isToastOpen, toastVariant, toastMessage, closeToast } = useToast();

  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
  };

  const styles = makeStyles((theme) => ({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.main
    },
    info: {
      backgroundColor: theme.palette.primary.main
    },
    warning: {
      backgroundColor: amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      alignItems: 'center',
      display: 'flex'
    }
  }))();

  const Icon = variantIcon[toastVariant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      autoHideDuration={5000}
      open={isToastOpen}
      onClose={closeToast}
    >
      <SnackbarContent
        className={styles[toastVariant]}
        message={
          <span className={styles.message}>
            <Icon className={`${styles.icon} ${styles.iconVariant}`} />
            {toastMessage}
          </span>
        }
        action={[
          <IconButton key="close" color="inherit" onClick={closeToast}>
            <CloseIcon className={styles.icon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export default Toast;
