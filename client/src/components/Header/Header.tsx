import { useState } from 'react';

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import classnames from 'classnames';
import { NavLink, useHistory } from 'react-router-dom';

import { MOBILE_QUERY } from '@src/constants';
import './Header.scss';

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    transition: 'color 0.2s',
    '&:focus, &:hover': {
      color: theme.palette.secondary.main
    },
    '@media screen and (prefers-reduced-motion: reduce)': {
      transition: 'none'
    }
  },
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
  const history = useHistory();
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

  const renderMobile = (): JSX.Element => (
    <>
      <IconButton
        onClick={handleOpen}
        color="inherit"
        className={styles.mobileMenuButton}
        data-testid="icon-button"
        aria-label="toggle side menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleClose} role="navigation">
        <List data-testid="mobile-menu">
          {listItems.map((item) => (
            <ListItem
              key={item.route}
              className={styles.listItem}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  history.push(item.route);
                  handleClose();
                }
              }}
              onClick={() => {
                history.push(item.route);
                handleClose();
              }}
              tabIndex={0}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );

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
