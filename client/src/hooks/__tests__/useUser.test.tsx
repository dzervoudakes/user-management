import { renderHook } from '@testing-library/react-hooks';
import { v4 as uuidv4 } from 'uuid';

import { UserContext, User } from '@src/context';

import { useUser } from '..';

describe('useUser', () => {
  const TestComponent: React.FC = ({ children }) => {
    const userList: User[] = [
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
    ];
    const error = false;
    const getUsers = jest.fn();

    return (
      <UserContext.Provider value={{ userList, error, getUsers }}>
        {children}
      </UserContext.Provider>
    );
  };

  it('returns the current value of UserContext', () => {
    const { result } = renderHook(() => useUser(), { wrapper: TestComponent });
    const { userList, error } = result.current;

    expect(userList.length).toBe(2);
    expect(error).toBe(false);
  });
});
