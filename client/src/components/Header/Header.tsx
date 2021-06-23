import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { MOBILE_QUERY } from '@src/constants';
import './Header.scss';

const useStyles = makeStyles((theme) => ({
  title: {
    borderRight: '0.0625rem solid #204361',
    display: 'inline-block',
    paddingRight: theme.spacing(6),
    paddingLeft: theme.spacing(8),
    verticalAlign: 'top'
  },
  titleMobile: {
    borderRight: 'none',
    paddingLeft: theme.spacing(7),
    flexGrow: 1
  },
  mobileMenuButton: {
    flot: 'right'
  }
}));

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const styles = useStyles();

  const handleOpen = (): void => {
    setIsDrawerOpen(true);
  };

  const handleClose = (): void => {
    setIsDrawerOpen(false);
  };

  const listItems = [
    { text: 'View All Users', route: '/' },
    { text: 'New User', route: '/new-user' }
  ];

  const renderDesktop = (): JSX.Element => (
    <ul className="desktop-menu" data-testid="desktop-menu">
      {listItems.map((item) => (
        <li key={item.route}>
          <NavLink to={item.route}>{item.text}</NavLink>
        </li>
      ))}
    </ul>
  );

  const renderMobile = (): JSX.Element => {
    return (
      <>
        <IconButton
          onClick={handleOpen}
          color="inherit"
          className={styles.mobileMenuButton}
          data-testid="icon-button"
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={isDrawerOpen} onClose={handleClose}>
          <List data-testid="mobile-menu">
            {listItems.map((item) => (
              <ListItem button key={item.route} onClick={handleClose}>
                <NavLink to={item.route}>
                  <ListItemText primary={item.text} />
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </>
    );
  };

  return (
    <header className="header">
      <Typography
        variant="h1"
        className={classnames(styles.title, isMobile && styles.titleMobile)}
      >
        User Management
      </Typography>
      {isMobile ? renderMobile() : renderDesktop()}
    </header>
  );
};

export default Header;
