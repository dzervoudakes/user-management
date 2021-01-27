import React from 'react';
import { Link } from 'react-router-dom';
import ContentContainer from '@src/components/ContentContainer';
import SectionHeader from '@src/components/SectionHeader';

const Missing: React.FC = () => (
  <ContentContainer className="missing">
    <SectionHeader title="That's a 404" description="You must be lost..." />
    <p>
      <Link to="/">Click here</Link> to return to the main application.
    </p>
  </ContentContainer>
);

export default Missing;
