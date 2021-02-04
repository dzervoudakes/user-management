import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const LoadingIndicator: React.FC = () => {
  const styles = makeStyles((theme) => ({
    progress: {
      marginLeft: `calc(50% - ${theme.spacing(5)}px)`,
      marginTop: theme.spacing(13)
    }
  }))();

  return (
    <CircularProgress
      className={styles.progress}
      color="secondary"
      data-testid="loading-indicator"
    />
  );
};

export default LoadingIndicator;
