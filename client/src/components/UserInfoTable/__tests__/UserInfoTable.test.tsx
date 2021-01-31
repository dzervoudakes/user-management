import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Gender } from '@src/context';
import { UserService } from '@src/services';
import Providers from '@src/components/Providers';
import Modal from '@src/components/Modal';
import Toast from '@src/components/Toast';
import UserInfoTable from '..';

const mockSource = { cancel: jest.fn() };

jest.mock('axios');
jest.mock('@src/services/UserService');
jest.mock('@src/api', () => ({
  isCancel: jest.fn().mockImplementation(() => false),
  source: jest.fn().mockImplementation(() => mockSource)
}));

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
      <Providers>
        <UserInfoTable user={mockUser} />
        <Modal />
        <Toast />
      </Providers>
    </MemoryRouter>
  );

  it('renders user information', () => {
    const { getByText, getByAltText } = render(<TestComponent />);

    expect(getByAltText('nyg10 user icon')).toBeInTheDocument();
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
    UserService.getUsers = jest.fn().mockResolvedValueOnce([]);
    const { getByTestId, getByText } = render(<TestComponent />);

    fireEvent.click(getByTestId('delete-button'));
    expect(getByText('Are you sure?')).toBeInTheDocument();
    expect(
      getByText('You are about to delete a user. This action cannot be undone.')
    ).toBeInTheDocument();

    fireEvent.click(getByText('Proceed'));
    expect(spy).toHaveBeenCalledWith(mockUser.id, mockSource);
    await waitFor(() => {
      expect(getByText('User successfully deleted.')).toBeInTheDocument();
    });
  });

  it('renders the error toast when the user fails to delete', async () => {
    UserService.getUsers = jest.fn().mockResolvedValueOnce([]);
    UserService.deleteUser = jest
      .fn()
      .mockRejectedValueOnce(() => new Error('there was an error'));
    const { getByTestId, getByText } = render(<TestComponent />);

    fireEvent.click(getByTestId('delete-button'));
    fireEvent.click(getByText('Proceed'));

    await waitFor(() => {
      expect(getByText('There was an error deleting the user.')).toBeInTheDocument();
    });
  });
});
