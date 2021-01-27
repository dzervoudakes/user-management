import React from 'react';
import classnames from 'classnames';
import './ContentContainer.scss';

interface ContentContainerProps {
  className: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children, className }) => {
  const classes = classnames('content-container', className);
  return <main className={classes}>{children}</main>;
};

export default ContentContainer;
