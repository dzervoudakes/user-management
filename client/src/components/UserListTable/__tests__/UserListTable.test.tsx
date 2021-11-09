import { render, screen } from '@testing-library/react';

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
          _id: '12345'
        }
      ] as User[],
      getUsers: jest.fn(),
      error: false
    };
    render(
      <UserContext.Provider value={mockContext}>
        <UserListTable />
      </UserContext.Provider>
    );

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('ID #')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();

    expect(screen.getByText('Eli')).toBeInTheDocument();
    expect(screen.getByText('Manning')).toBeInTheDocument();
    expect(screen.getByText('nyg10')).toBeInTheDocument();
    expect(screen.getByText('1925 Giants Drive')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
  });
});
