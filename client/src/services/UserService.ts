/**
 * Abstracts business logic for communication with the 'users' API.
 * @packageDocumentation
 */
import { CancelTokenSource } from 'axios';

import Api, { ApiResponse } from '@src/api/Api';
import { API_BASE_URL } from '@src/constants';
import { User } from '@src/context';

const BASE_URL = `${API_BASE_URL}/users`;

export class UserService {
  static getUsers(source?: CancelTokenSource): ApiResponse {
    return Api.get(BASE_URL, { source });
  }

  static createUser(user: Omit<User, '_id'>, source?: CancelTokenSource): ApiResponse {
    return Api.post(BASE_URL, user, { source });
  }

  static updateUser(
    id: string,
    user: Omit<User, '_id'>,
    source?: CancelTokenSource
  ): ApiResponse {
    return Api.put(`${BASE_URL}/${id}`, user, { source });
  }

  static deleteUser(id: string, source?: CancelTokenSource): ApiResponse {
    return Api.delete(`${BASE_URL}/${id}`, { source });
  }
}

export default UserService;
