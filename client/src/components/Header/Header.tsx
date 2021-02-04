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
import { MOBILE_WIDTH } from '@src/constants';
import './Header.scss';

// @todo combine desktop and mobile markup into one; changing style only
// alternative ... go 'mobile only'?

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: ${MOBILE_WIDTH}px)` });

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
        <div className="icon-button-container">
          <IconButton onClick={handleOpen} color="inherit" data-testid="icon-button">
            <MenuIcon />
          </IconButton>
        </div>
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
      <Typography variant="h1">MUI User Management</Typography>
      {isMobile ? renderMobile() : renderDesktop()}
    </header>
  );
};

export default Header;
