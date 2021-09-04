import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthService, UserService } from '@src/services';
import App from '../App';

jest.mock('@src/services/AuthService');
jest.mock('@src/services/UserService');

beforeEach(() => {
  AuthService.generateToken = jest
    .fn()
    .mockResolvedValue({ data: { token: 'i am a token' } });

  UserService.getUsers = jest.fn().mockResolvedValue({ data: { users: [] } });
});

describe('App', () => {
  it('renders the application', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Current Users')).toBeInTheDocument();
    });
  });
});
