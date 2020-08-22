/**
 * Hook into the UserContext.
 * @packageDocumentation
 */
import { useContext } from 'react';
import { UserContext, UserContextProps } from '@src/context';

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used with a UserProvider.');
  }

  return context;
};

export default useUser;
