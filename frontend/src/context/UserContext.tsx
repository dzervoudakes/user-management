/**
 * Retrieve and store a list of users from the backend.
 * @packageDocumentation
 */
import React, { createContext, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import Api from '@src/api';
import { UserService } from '@src/services';
import { User } from '@src/types';

export interface UserContextProps {
  userList: User[];
  error: boolean;
}

export const UserContext = createContext<UserContextProps>({
  userList: [],
  error: false
});

export const UserProvider: React.FC = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(false);

  const source = Api.source();

  const getUsers = async (): Promise<AxiosResponse> => {
    try {
      const result = await UserService.getUsers(source);
      const { users } = result.data;

      setUserList(users);
      setError(false);
      return result;
    } catch (e) {
      /* istanbul ignore else */
      if (!Api.isCancel(e)) {
        setError(true);
      }
      return e;
    }
  };

  useEffect(() => {
    getUsers();
    return () => source.cancel();
  });

  return (
    <UserContext.Provider value={{ userList, error }}>{children}</UserContext.Provider>
  );
};

export default UserContext;
