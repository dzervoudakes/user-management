import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MOBILE_WIDTH } from '@src/constants';
import './Header.scss';

// @todo Typography component(s) from MUI?
// @todo combine desktop and mobile markup into one; changing style only

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
      <h1 className="page-title">AnonCorp User Management</h1>
      {isMobile ? renderMobile() : renderDesktop()}
    </header>
  );
};

export default Header;
