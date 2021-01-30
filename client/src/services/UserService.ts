/**
 * Abstracts business logic for communication with the 'users' API.
 * @packageDocumentation
 */
import { CancelTokenSource } from 'axios';
import Api, { ApiResponse } from '@src/api/Api';
import { User } from '@src/context';

const BASE_URL = 'http://localhost:3000/api/users'; // @todo .env

export class UserService {
  static getUsers(source?: CancelTokenSource): ApiResponse {
    return Api.get(BASE_URL, { source });
  }

  static createUser(user: User, source?: CancelTokenSource): ApiResponse {
    return Api.post(BASE_URL, user, { source });
  }

  static updateUser(id: string, user: User, source?: CancelTokenSource): ApiResponse {
    return Api.put(`${BASE_URL}/${id}`, user, { source });
  }

  static deleteUser(id: string, source?: CancelTokenSource): ApiResponse {
    return Api.delete(`${BASE_URL}/${id}`, { source });
  }
}

export default UserService;
