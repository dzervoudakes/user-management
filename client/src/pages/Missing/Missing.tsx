import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@src/components/Layout';
import SectionHeader from '@src/components/SectionHeader';

const Missing: React.FC = () => (
  <Layout className="missing">
    <SectionHeader title="That's a 404" description="You must be lost..." />
    <p>
      <Link to="/">Click here</Link> to return to the main application.
    </p>
  </Layout>
);

export default Missing;
