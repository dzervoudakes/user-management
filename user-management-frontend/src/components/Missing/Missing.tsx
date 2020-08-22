import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@shared/Layout';
import SectionHeader from '@shared/SectionHeader';

const Missing: React.FC = () => (
  <Layout>
    <SectionHeader title="That's a 404" description="You must be lost..." />
    <p>
      <Link to="/" className="link-purple">
        Click here
      </Link>{' '}
      to return to the main application.
    </p>
  </Layout>
);

export default Missing;
