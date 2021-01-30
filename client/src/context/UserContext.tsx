/**
 * Retrieve and store a list of users from the backend.
 * @packageDocumentation
 */
import React, { createContext, useEffect, useState } from 'react';
import noop from 'lodash/noop';
import { AxiosResponse } from 'axios';
import Api from '@src/api';
import { UserService } from '@src/services';

export type Gender = 'male' | 'female' | 'other';

export interface User {
  address: string;
  firstName: string;
  id: string;
  lastName: string;
  username: string;
  gender: Gender;
}

export interface UserContextProps {
  userList: User[];
  getUsers: () => Promise<AxiosResponse> | void;
  error: boolean;
}

export const UserContext = createContext<UserContextProps>({
  userList: [],
  getUsers: noop,
  error: false
});

export const UserProvider: React.FC = ({ children }) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [error, setError] = useState(false);

  const source = Api.source();

  const getUsers = async (): Promise<AxiosResponse> => {
    try {
      const result = await UserService.getUsers(source);
      const { users } = result.data;

      setUserList(users as User[]);
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
    <UserContext.Provider value={{ userList, getUsers, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
