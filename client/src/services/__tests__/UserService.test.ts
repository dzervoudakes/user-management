import { v4 as uuidv4 } from 'uuid';
import Api from '@src/api/Api';
import { User } from '@src/context';
import { API_BASE_URL } from '@src/constants';
import { UserService } from '..';

jest.mock('axios', () => ({
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      cancel: jest.fn()
    }))
  },
  isCancel: jest.fn().mockImplementation(() => false),
  request: jest.fn()
}));

describe('UserService', () => {
  const _id = uuidv4();
  const source = undefined;
  const url = `${API_BASE_URL}/users`;

  const mockUser: User = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'helloworld7',
    address: '123 Fake St, Nowhere, CO 80123',
    gender: 'other',
    _id
  };

  test('getUsers calls Api get method with the correct arguments', () => {
    const spy = jest.spyOn(Api, 'get');

    UserService.getUsers(source);

    expect(spy).toHaveBeenCalledWith(url, { source });
  });

  test('createUser calls Api post method with the correct arguments', () => {
    const spy = jest.spyOn(Api, 'post');

    UserService.createUser(mockUser, source);

    expect(spy).toHaveBeenCalledWith(url, mockUser, { source });
  });

  test('updateUser calls Api put method with the correct arguments', () => {
    const spy = jest.spyOn(Api, 'put');

    UserService.updateUser(_id, mockUser, source);

    expect(spy).toHaveBeenCalledWith(`${url}/${_id}`, mockUser, { source });
  });

  test('deleteUser calls Api put method with the correct arguments', () => {
    const spy = jest.spyOn(Api, 'delete');

    UserService.deleteUser(_id, source);

    expect(spy).toHaveBeenCalledWith(`${url}/${_id}`, { source });
  });
});
