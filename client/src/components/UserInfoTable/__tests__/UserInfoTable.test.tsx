import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Gender } from '@src/context';
import { AuthService, UserService } from '@src/services';
import Providers from '@src/components/Providers';
import Modal from '@src/components/Modal';
import Toast from '@src/components/Toast';
import UserInfoTable from '..';

const mockSource = { cancel: jest.fn() };

jest.mock('axios', () => ({
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      cancel: jest.fn()
    }))
  },
  isCancel: jest.fn().mockImplementation(() => false),
  request: jest.fn()
}));
jest.mock('@src/services/UserService');
jest.mock('@src/services/AuthService');
jest.mock('@src/api', () => ({
  isCancel: jest.fn().mockImplementation(() => false),
  source: jest.fn().mockImplementation(() => mockSource)
}));

const mockUser = {
  firstName: 'Eli',
  lastName: 'Manning',
  username: 'nyg10',
  address: '1925 Giants Drive',
  gender: 'male' as Gender,
  _id: '12345'
};

beforeEach(() => {
  AuthService.generateToken = jest
    .fn()
    .mockResolvedValue({ data: { token: 'i am a token' } });

  UserService.getUsers = jest.fn().mockResolvedValue({ data: { users: [mockUser] } });
});

describe('UserInfoTable', () => {
  const TestComponent: React.FC = () => (
    <MemoryRouter>
      <Providers>
        <UserInfoTable user={mockUser} />
        <Modal />
        <Toast />
      </Providers>
    </MemoryRouter>
  );

  it('renders user information', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByAltText('nyg10 user icon')).toBeInTheDocument();
      expect(screen.getByText('Eli Manning')).toBeInTheDocument();
      expect(screen.getByText('nyg10')).toBeInTheDocument();
      expect(screen.getByText('1925 Giants Drive')).toBeInTheDocument();
      expect(screen.getByText('Male')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
    });
  });

  it('toggles the edit view', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.queryByText('Cancel')).toBe(null);

      fireEvent.click(screen.getByLabelText('Edit entry for Eli Manning'));
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  it('deletes a user', async () => {
    const spy = jest.spyOn(UserService, 'deleteUser');
    render(<TestComponent />);

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText('Delete entry for Eli Manning'));
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
      expect(
        screen.getByText('You are about to delete a user. This action cannot be undone.')
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Proceed'));
    expect(spy).toHaveBeenCalledWith(mockUser._id, mockSource);
    await waitFor(() => {
      expect(screen.getByText('User successfully deleted.')).toBeInTheDocument();
    });
  });

  it('renders the error toast when the user fails to delete', async () => {
    UserService.deleteUser = jest
      .fn()
      .mockRejectedValueOnce(() => new Error('there was an error'));
    render(<TestComponent />);

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText('Delete entry for Eli Manning'));
    });

    fireEvent.click(screen.getByText('Proceed'));
    await waitFor(() => {
      expect(
        screen.getByText('There was an error deleting the user.')
      ).toBeInTheDocument();
    });
  });
});
