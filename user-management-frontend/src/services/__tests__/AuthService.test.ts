import Api from '@src/api/Api';
import { AuthService } from '..';

jest.mock('axios');

describe('AuthService', () => {
  const source = undefined;
  const url = 'http://localhost:3000/api/auth'; // @todo .env

  test('generateToken retrieves the fake auth token', () => {
    const spy = jest.spyOn(Api, 'post');
    const payload = { username: 'admin', password: 'letmein' };

    AuthService.generateToken(payload, source);

    expect(spy).toHaveBeenCalledWith(url, payload, { source });
  });
});