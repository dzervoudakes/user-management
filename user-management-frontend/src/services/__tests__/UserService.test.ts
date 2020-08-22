import { v4 as uuidv4 } from 'uuid';
import Api from '@src/api/Api';
import { User } from '@src/types';
import { UserService } from '..';

jest.mock('axios');

describe('UserService', () => {
  const id = uuidv4();
  const source = undefined;
  const url = 'http://localhost:3000/api/users'; // @todo .env

  const mockUser: User = {
    firstName: 'Foo',
    lastName: 'Bar',
    username: 'helloworld7',
    address: '123 Fake St, Nowhere, CO 80123',
    gender: 'other',
    id
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

    UserService.updateUser(id, mockUser, source);

    expect(spy).toHaveBeenCalledWith(`${url}/${id}`, mockUser, { source });
  });

  test('deleteUser calls Api put method with the correct arguments', () => {
    const spy = jest.spyOn(Api, 'delete');

    UserService.deleteUser(id, source);

    expect(spy).toHaveBeenCalledWith(`${url}/${id}`, { source });
  });
});
