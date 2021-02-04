import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './SectionHeader.scss';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  const styles = makeStyles(() => ({
    description: {
      fontWeight: 700,
      paddingBottom: '0.25rem'
    }
  }))();

  return (
    <div className="section-header">
      <Typography variant="h2">{title}</Typography>
      <Typography className={styles.description}>{description}</Typography>
    </div>
  );
};

export default SectionHeader;
