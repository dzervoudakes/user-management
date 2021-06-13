import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthService, UserService } from '@src/services';
import Providers from '..';

jest.mock('@src/services/AuthService');
jest.mock('@src/services/UserService');

describe('Providers', () => {
  it('renders the children', async () => {
    AuthService.generateToken = jest
      .fn()
      .mockResolvedValueOnce({ data: { token: 'i am a token' } });
    UserService.getUsers = jest.fn().mockResolvedValueOnce({ data: { users: [] } });

    render(
      <Providers>
        <div>Foo</div>
      </Providers>
    );

    await waitFor(() => {
      expect(screen.getByText('Foo')).toBeInTheDocument();
    });
  });

  it('renders the error state when the call to getAuthToken fails', async () => {
    AuthService.generateToken = jest
      .fn()
      .mockRejectedValueOnce(new Error('there was an error'));

    render(
      <Providers>
        <div>Foo</div>
      </Providers>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Unfortunately, we were unable to authenticate. No app for you!')
      ).toBeInTheDocument();
    });
  });
});
