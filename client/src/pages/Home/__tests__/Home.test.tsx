/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import noop from 'lodash/noop';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { UserContext, User } from '@src/context';
import Home from '..';

describe('Home', () => {
  interface TestComponentProps {
    userList?: User[];
  }

  const defaultUserList = [
    {
      firstName: 'Eli',
      lastName: 'Manning',
      username: 'nyg10',
      address: '1925 Giants Drive',
      gender: 'male',
      id: '12345'
    },
    {
      firstName: 'Saquon',
      lastName: 'Barkley',
      username: 'nyg26',
      address: '2591 Giants Drive',
      gender: 'male',
      id: '54321'
    }
  ] as User[];

  const TestComponent: React.FC<TestComponentProps> = ({
    userList = defaultUserList
  }) => {
    const mockContext = {
      userList,
      getUsers: noop,
      error: false
    };
    return (
      <MemoryRouter>
        <UserContext.Provider value={mockContext}>
          <Home />
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  it('renders a list of users', () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText('Current Users')).toBeInTheDocument();
    expect(getByText('2 users found.')).toBeInTheDocument();
    expect(getByText('Eli')).toBeInTheDocument();
    expect(getByText('Saquon')).toBeInTheDocument();
  });

  it('renders the empty state when no users are found', () => {
    const { getByText } = render(<TestComponent userList={[]} />);

    expect(getByText('0 users found.')).toBeInTheDocument();
    expect(getByText('click here').closest('a')).toHaveAttribute('href', '/new-user');
  });

  it('toggles admin view on click', () => {
    const { getByText, container } = render(<TestComponent />);

    expect(getByText('Admin mode disabled.')).toBeInTheDocument();

    const switchInput = container.querySelector('input[value="view"]')!;
    fireEvent.click(switchInput);

    expect(getByText('Admin mode enabled.')).toBeInTheDocument();
  });

  it('toggles admin view on key press', () => {
    const { getByText, container } = render(<TestComponent />);

    expect(getByText('Admin mode disabled.')).toBeInTheDocument();

    const switchInput = container.querySelector('input[value="view"]')!;
    fireEvent.keyPress(switchInput, { key: 'Enter', charCode: 13 });

    expect(getByText('Admin mode enabled.')).toBeInTheDocument();
  });
});
