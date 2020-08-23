import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const LoadingIndicator: React.FC = () => {
  const styles = makeStyles(() => ({
    progress: {
      marginLeft: 'calc(50% - 1.25rem)',
      marginTop: '3.125rem'
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
