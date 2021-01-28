import React from 'react';
import classnames from 'classnames';
import './Layout.scss';

interface LayoutProps {
  className: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const classes = classnames('layout', className);
  return <main className={classes}>{children}</main>;
};

export default Layout;
