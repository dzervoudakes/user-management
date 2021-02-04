import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

interface LayoutProps {
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const styles = makeStyles(() => ({
    layout: {
      marginBottom: '2rem',
      padding: '1.5rem 1.125rem'
    }
  }))();

  return <main className={classnames(styles.layout, className)}>{children}</main>;
};

export default Layout;
