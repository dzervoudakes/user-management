import React from 'react';
import { Typography } from '@material-ui/core';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="footer">
    <Typography color="inherit">
      Copyright &copy; {new Date().getFullYear()} Dan Zervoudakes
    </Typography>
  </footer>
);

export default Footer;
