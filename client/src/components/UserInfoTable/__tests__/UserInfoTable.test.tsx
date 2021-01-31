import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { UserProvider, ModalProvider, Gender } from '@src/context';
import { UserService } from '@src/services';
import Api from '@src/api';
import UserInfoTable from '..';

const mockSource = { cancel: jest.fn() };

jest.unmock('axios');
jest.mock('@src/services/UserService');
jest.mock('@src/api');

describe('UserInfoTable', () => {
  const mockUser = {
    firstName: 'Eli',
    lastName: 'Manning',
    username: 'nyg10',
    address: '1925 Giants Drive',
    gender: 'male' as Gender,
    id: '12345'
  };

  const TestComponent: React.FC = () => (
    <MemoryRouter>
      <UserProvider>
        <ModalProvider>
          <UserInfoTable user={mockUser} />
        </ModalProvider>
      </UserProvider>
    </MemoryRouter>
  );

  it('renders user information', () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText('Eli Manning')).toBeInTheDocument();
    expect(getByText('nyg10')).toBeInTheDocument();
    expect(getByText('1925 Giants Drive')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();
    expect(getByText('12345')).toBeInTheDocument();
  });

  it('toggles the edit view', () => {
    const { queryByText, getByText, getByTestId } = render(<TestComponent />);

    expect(queryByText('Cancel')).toBe(null);

    fireEvent.click(getByTestId('edit-button'));
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('deletes a user', async () => {
    const spy = jest.spyOn(UserService, 'deleteUser');
    UserService.getUsers = jest.fn().mockImplementation(() => []);
    Api.source = jest.fn().mockImplementation(() => mockSource);
    const { getByTestId, getByText } = render(<TestComponent />);

    fireEvent.click(getByTestId('delete-button'));
    await waitFor(() => {
      expect(getByText('Are you sure?')).toBeInTheDocument();
      expect(
        getByText('You are about to delete a user. This action cannot be undone.')
      ).toBeInTheDocument();
    });

    fireEvent.click(getByText('Proceed'));
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(mockUser.id, mockSource);
      expect(getByText('User successfully deleted.')).toBeInTheDocument();
    });
  });
});
