/**
 * Retrieve and store a list of users from the backend.
 * @packageDocumentation
 */
import { createContext, useEffect, useState } from 'react';
import noop from 'lodash/noop';
import { Typography } from '@material-ui/core';
import LoadingIndicator from '@src/components/LoadingIndicator';
import { UserService } from '@src/services';
import Api from '@src/api';

export type Gender = 'male' | 'female' | 'other';

export interface User {
  _id: string;
  address: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: Gender;
}

export interface UserContextProps {
  userList: User[];
  getUsers: () => void;
  error: boolean;
}

export const UserContext = createContext<UserContextProps>({
  userList: [],
  getUsers: noop,
  error: false
});

export const UserProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState<User[]>([]);
  const [error, setError] = useState(false);

  const source = Api.source();

  const getUsers = async (): Promise<void> => {
    try {
      const result = await UserService.getUsers(source);
      const { users } = result.data;

      setUserList(users as User[]);
      setError(false);
      setLoading(false);
    } catch (err) {
      if (!Api.isCancel(err as Record<string, unknown>)) {
        setError(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getUsers();
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <UserContext.Provider value={{ userList, getUsers, error }}>
      {!error ? (
        children
      ) : (
        <Typography className="home-load-error">
          There was an unfortunate error and we were unable to retrieve the users. Luckily
          this is merely a demo app, and this would &apos;never&apos; happen in a real
          world situation...{' '}
          <span role="img" aria-label="grimacing">
            😬
          </span>
        </Typography>
      )}
    </UserContext.Provider>
  );
};

export default UserContext;
