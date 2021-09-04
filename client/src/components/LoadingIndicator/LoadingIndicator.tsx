import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  progress: {
    marginLeft: `calc(50% - ${theme.spacing(5)}px)`,
    marginTop: theme.spacing(13)
  }
}));

const LoadingIndicator: React.FC = () => {
  const styles = useStyles();

  return (
    <CircularProgress
      className={styles.progress}
      color="secondary"
      data-testid="loading-indicator"
    />
  );
};

export default LoadingIndicator;
