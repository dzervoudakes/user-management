import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  const styles = makeStyles(() => ({
    sectionHeader: {
      borderBottom: '0.0625rem dotted #e1e1e1',
      marginBottom: '1.5rem'
    },
    description: {
      fontWeight: 700,
      paddingBottom: '0.25rem'
    }
  }))();

  return (
    <div className={styles.sectionHeader}>
      <Typography variant="h2">{title}</Typography>
      <Typography className={styles.description}>{description}</Typography>
    </div>
  );
};

export default SectionHeader;
