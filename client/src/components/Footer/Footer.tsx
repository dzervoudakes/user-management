import { Typography } from '@material-ui/core';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="footer">
    <Typography color="inherit">
      Copyright &copy; {new Date().getFullYear()} User Management Corp.
    </Typography>
  </footer>
);

export default Footer;
