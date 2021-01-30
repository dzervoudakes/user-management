/**
 * Abstracts business logic for communication with the 'auth' API.
 * @packageDocumentation
 */
import { CancelTokenSource } from 'axios';
import Api, { ApiResponse } from '@src/api/Api';
import { API_BASE_URL } from '@src/constants';

interface AuthTokenPayload {
  username: string;
  password: string;
}

const BASE_URL = `${API_BASE_URL}/auth`;

export class AuthService {
  static generateToken(data: AuthTokenPayload, source?: CancelTokenSource): ApiResponse {
    return Api.post(BASE_URL, data, { source });
  }
}

export default AuthService;
