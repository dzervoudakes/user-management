import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    borderBottom: '0.0625rem dotted #e1e1e1',
    marginBottom: theme.spacing(6)
  },
  description: {
    fontWeight: 700,
    paddingBottom: theme.spacing(1)
  }
}));

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  const styles = useStyles();

  return (
    <div className={styles.sectionHeader}>
      <Typography variant="h2">{title}</Typography>
      <Typography className={styles.description}>{description}</Typography>
    </div>
  );
};

export default SectionHeader;
