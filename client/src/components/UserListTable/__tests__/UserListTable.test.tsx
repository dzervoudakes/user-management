import React from 'react';
import noop from 'lodash/noop';
import { render } from '@testing-library/react';
import { UserContext, User } from '@src/context';
import UserListTable from '..';

describe('UserListTable', () => {
  it('renders the table', () => {
    const mockContext = {
      userList: [
        {
          firstName: 'Eli',
          lastName: 'Manning',
          username: 'nyg10',
          address: '1925 Giants Drive',
          gender: 'male',
          id: '12345'
        }
      ] as User[],
      getUsers: noop,
      error: false
    };
    const { getByText } = render(
      <UserContext.Provider value={mockContext}>
        <UserListTable />
      </UserContext.Provider>
    );

    expect(getByText('Username')).toBeInTheDocument();
    expect(getByText('ID #')).toBeInTheDocument();
    expect(getByText('First Name')).toBeInTheDocument();
    expect(getByText('Last Name')).toBeInTheDocument();
    expect(getByText('Gender')).toBeInTheDocument();
    expect(getByText('Address')).toBeInTheDocument();

    expect(getByText('Eli')).toBeInTheDocument();
    expect(getByText('Manning')).toBeInTheDocument();
    expect(getByText('nyg10')).toBeInTheDocument();
    expect(getByText('1925 Giants Drive')).toBeInTheDocument();
    expect(getByText('male')).toBeInTheDocument();
    expect(getByText('12345')).toBeInTheDocument();
  });
});
