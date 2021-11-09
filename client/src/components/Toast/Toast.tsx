import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

import { useToast } from '@src/hooks';

const useStyles = makeStyles((theme) => ({
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
    marginRight: theme.spacing(2)
  },
  message: {
    alignItems: 'center',
    display: 'flex'
  }
}));

const Toast: React.FC = () => {
  const { isToastOpen, toastVariant, toastMessage, closeToast } = useToast();
  const styles = useStyles();

  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
  };

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
