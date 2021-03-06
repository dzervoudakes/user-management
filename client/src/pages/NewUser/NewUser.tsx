import React from 'react';
import SectionHeader from '@src/components/SectionHeader';
import Layout from '@src/components/Layout';
import UserForm from '@src/components/UserForm';

const NewUser: React.FC = () => (
  <Layout className="new-user">
    <SectionHeader
      title="Create a User"
      description="Please fill out all form fields below."
    />
    <UserForm />
  </Layout>
);

export default NewUser;
