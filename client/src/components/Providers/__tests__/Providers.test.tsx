import React from 'react';
import { render, waitFor } from '@testing-library/react';
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

    const { getByText } = render(
      <Providers>
        <div>Foo</div>
      </Providers>
    );

    await waitFor(() => {
      expect(getByText('Foo')).toBeInTheDocument();
    });
  });

  it('renders the error state when the call to getAuthToken fails', async () => {
    AuthService.generateToken = jest
      .fn()
      .mockRejectedValueOnce(new Error('there was an error'));

    const { getByText } = render(
      <Providers>
        <div>Foo</div>
      </Providers>
    );

    await waitFor(() => {
      expect(
        getByText('Unfortunately, we were unable to authenticate. No app for you!')
      ).toBeInTheDocument();
    });
  });
});
