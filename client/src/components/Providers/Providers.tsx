import React from 'react';
import { UserProvider, ModalProvider, ToastProvider } from '@src/context';

const Providers: React.FC = ({ children }) => (
  <UserProvider>
    <ModalProvider>
      <ToastProvider>{children}</ToastProvider>
    </ModalProvider>
  </UserProvider>
);

export default Providers;
