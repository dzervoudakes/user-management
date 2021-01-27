/**
 * Abstracts business logic for communication with the 'auth' API.
 * @packageDocumentation
 */
import { AxiosResponse, CancelTokenSource } from 'axios';
import Api from '@src/api/Api';

interface AuthTokenPayload {
  username: string;
  password: string;
}

const BASE_URL = 'http://localhost:3000/api/auth'; // @todo .env

export class AuthService {
  static generateToken(
    data: AuthTokenPayload,
    source?: CancelTokenSource
  ): Promise<AxiosResponse<any>> {
    return Api.post(BASE_URL, data, { source });
  }
}

export default AuthService;
