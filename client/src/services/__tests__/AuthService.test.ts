import Api from '@src/api/Api';
import { API_BASE_URL } from '@src/constants';

import { AuthService } from '..';

jest.mock('axios', () => ({
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      cancel: jest.fn()
    }))
  },
  isCancel: jest.fn().mockImplementation(() => false),
  request: jest.fn()
}));

describe('AuthService', () => {
  const source = undefined;
  const url = `${API_BASE_URL}/auth`;

  test('generateToken retrieves the fake auth token', () => {
    const spy = jest.spyOn(Api, 'post');
    const payload = { username: 'admin', password: 'letmein' };

    AuthService.generateToken(payload, source);

    expect(spy).toHaveBeenCalledWith(url, payload, { source });
  });
});
