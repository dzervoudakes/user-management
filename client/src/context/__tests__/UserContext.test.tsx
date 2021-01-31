import React from 'react';
import { render, waitFor } from '@testing-library/react';
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
          id: uuidv4(),
          lastName: 'Doe',
          username: 'jdoe123'
        },
        {
          address: '456 Fake St.',
          firstName: 'Jane',
          gender: 'female',
          id: uuidv4(),
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
    const { getByText } = render(<Wrapper />);

    await waitFor(() => getByText('Error: false'));

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Jane')).toBeInTheDocument();
  });

  it('sets the error state when the call to getUsers fails', async () => {
    UserService.getUsers = jest
      .fn()
      .mockRejectedValueOnce(new Error('there was an error'));
    const { getByText, queryByText } = render(<Wrapper />);

    await waitFor(() => getByText('😬'));

    expect(queryByText('John')).toBeNull();
    expect(queryByText('Jane')).toBeNull();
  });
});
