import React from 'react';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '@src/services';
import { UserContext, UserProvider } from '..';

jest.mock('@src/services/UserService');

describe('UserContext', () => {
  const mockUsersResponse = {
    data: {
      users: [
        {
          address: '123 Fake St.',
          firstName: 'John',
          gender: 'male',
          _id: uuidv4(),
          lastName: 'Doe',
          username: 'jdoe123'
        },
        {
          address: '456 Fake St.',
          firstName: 'Jane',
          gender: 'female',
          _id: uuidv4(),
          lastName: 'Doe',
          username: 'jdoe456'
        }
      ]
    }
  };

  const TestComponent: React.FC = () => (
    <UserContext.Consumer>
      {({ error, userList }) => (
        <div>
          <div>Error: {error.toString()}</div>
          {userList.map(({ firstName }) => (
            <div key={firstName}>{firstName}</div>
          ))}
        </div>
      )}
    </UserContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <UserProvider>
      <TestComponent />
    </UserProvider>
  );

  it('provides a list of users to context consumers', async () => {
    UserService.getUsers = jest.fn().mockResolvedValueOnce(mockUsersResponse);
    render(<Wrapper />);

    await screen.findByText('Error: false');

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('sets the error state when the call to getUsers fails', async () => {
    UserService.getUsers = jest
      .fn()
      .mockRejectedValueOnce(new Error('there was an error'));
    render(<Wrapper />);

    await screen.findByText('😬');

    expect(screen.queryByText('John')).toBeNull();
    expect(screen.queryByText('Jane')).toBeNull();
  });
});
