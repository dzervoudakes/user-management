import React from 'react';
import './SectionHeader.scss';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <div className="section-header">
    <h2>{title}</h2>
    <p className="t-heavy">{description}</p>
  </div>
);

export default SectionHeader;
