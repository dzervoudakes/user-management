import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Layout from '@src/components/Layout';
import SectionHeader from '@src/components/SectionHeader';

const Missing: React.FC = () => (
  <Layout className="missing">
    <SectionHeader title="That's a 404" description="You must be lost..." />
    <Typography>
      <Link to="/">Click here</Link> to return to the main application.
    </Typography>
  </Layout>
);

export default Missing;
