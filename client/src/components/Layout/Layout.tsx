import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

interface LayoutProps {
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const styles = makeStyles((theme) => ({
    layout: {
      marginBottom: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(5)}px`
    }
  }))();

  return <main className={classnames(styles.layout, className)}>{children}</main>;
};

export default Layout;
