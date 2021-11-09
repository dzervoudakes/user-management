/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

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
      _id: '12345'
    },
    {
      firstName: 'Saquon',
      lastName: 'Barkley',
      username: 'nyg26',
      address: '2591 Giants Drive',
      gender: 'male',
      _id: '54321'
    }
  ] as User[];

  const TestComponent: React.FC<TestComponentProps> = ({
    userList = defaultUserList
  }) => {
    const mockContext = {
      userList,
      getUsers: jest.fn(),
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
    render(<TestComponent />);

    expect(screen.getByText('Current Users')).toBeInTheDocument();
    expect(screen.getByText('2 users found.')).toBeInTheDocument();
    expect(screen.getByText('Eli')).toBeInTheDocument();
    expect(screen.getByText('Saquon')).toBeInTheDocument();
  });

  it('renders the empty state when no users are found', () => {
    render(<TestComponent userList={[]} />);

    expect(screen.getByText('0 users found.')).toBeInTheDocument();
    expect(screen.getByText('click here').closest('a')).toHaveAttribute(
      'href',
      '/new-user'
    );
  });

  it('toggles admin view on click', () => {
    const { container } = render(<TestComponent />);

    expect(screen.getByText('Admin mode disabled.')).toBeInTheDocument();

    const switchInput = container.querySelector('input[value="view"]')!;
    fireEvent.click(switchInput);

    expect(screen.getByText('Admin mode enabled.')).toBeInTheDocument();
  });

  it('toggles admin view on key press', () => {
    const { container } = render(<TestComponent />);

    expect(screen.getByText('Admin mode disabled.')).toBeInTheDocument();

    const switchInput = container.querySelector('input[value="view"]')!;
    fireEvent.keyPress(switchInput, { key: 'Enter', charCode: 13 });

    expect(screen.getByText('Admin mode enabled.')).toBeInTheDocument();
  });
});
