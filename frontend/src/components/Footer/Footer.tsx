import React from 'react';
import './Footer.scss';

// @todo rebrand title/company name

const Footer: React.FC = () => (
  <footer className="footer">
    <p className="t-copyright">Copyright &copy; {new Date().getFullYear()} AnonCorp</p>
  </footer>
);

export default Footer;
