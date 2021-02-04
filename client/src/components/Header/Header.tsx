import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
import { MOBILE_BREAKPOINT } from '@src/constants';
import './Header.scss';

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: ${MOBILE_BREAKPOINT}px)` });

  const styles = makeStyles(() => ({
    title: {
      borderRight: isMobile ? 'none' : '0.0625rem solid #204361',
      display: 'inline-block',
      paddingRight: '1.5rem',
      paddingLeft: isMobile ? '2.25rem' : '2.5rem',
      flexGrow: isMobile ? 1 : 0,
      verticalAlign: 'top'
    },
    mobileMenuButton: {
      flot: 'right'
    }
  }))();

  const handleOpen = (): void => {
    setIsDrawerOpen(true);
  };

  const handleClose = (): void => {
    setIsDrawerOpen(false);
  };

  const renderDesktop = (): JSX.Element => (
    <ul className="desktop-menu" data-testid="desktop-menu">
      <li>
        <NavLink to="/">View All Users</NavLink>
      </li>
      <li>
        <NavLink to="/new-user">New User</NavLink>
      </li>
    </ul>
  );

  const renderMobile = (): JSX.Element => {
    const listItems = [
      { text: 'View All Users', route: '/' },
      { text: 'New User', route: '/new-user' }
    ];

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
              <ListItem button key={item.text} onClick={handleClose}>
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
      <Typography variant="h1" className={styles.title}>
        User Management
      </Typography>
      {isMobile ? renderMobile() : renderDesktop()}
    </header>
  );
};

export default Header;
