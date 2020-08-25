/**
 * Wrapper class for Axios that applies a custom authorization header for all requests.
 * @packageDocumentation
 */
import axios, { AxiosResponse, AxiosRequestConfig, CancelTokenSource } from 'axios';
import omit from 'lodash/omit';

interface RequestConfigOptions extends AxiosRequestConfig {
  source?: CancelTokenSource;
}

const commonOmitFields = ['url', 'method', 'data'];

class Api {
  static delete(url: string, options: RequestConfigOptions): Promise<AxiosResponse<any>> {
    return this.request({
      ...omit(options, commonOmitFields),
      url,
      method: 'DELETE'
    });
  }

  static get(url: string, options: RequestConfigOptions): Promise<AxiosResponse<any>> {
    return this.request({
      ...omit(options, commonOmitFields),
      url,
      method: 'GET'
    });
  }

  static patch<T>(
    url: string,
    data: T,
    options: RequestConfigOptions
  ): Promise<AxiosResponse<any>> {
    const { headers = {} } = options;

    const patchHeaders = {
      ...headers,
      'Content-Type': 'application/json-patch+json'
    };

    return this.request({
      ...omit(options, [...commonOmitFields, 'headers']),
      url,
      method: 'PATCH',
      data,
      headers: patchHeaders
    });
  }

  static post<T>(
    url: string,
    data: T,
    options: RequestConfigOptions
  ): Promise<AxiosResponse<any>> {
    return this.request({
      ...omit(options, commonOmitFields),
      url,
      method: 'POST',
      data
    });
  }

  static put<T>(
    url: string,
    data: T,
    options: RequestConfigOptions
  ): Promise<AxiosResponse<any>> {
    return this.request({
      ...omit(options, commonOmitFields),
      url,
      method: 'PUT',
      data
    });
  }

  static request({
    url,
    method,
    data,
    params,
    headers,
    responseType = 'json',
    source
  }: RequestConfigOptions): Promise<AxiosResponse<any>> {
    const options: RequestConfigOptions = {
      url,
      method,
      data,
      params,
      headers,
      responseType
    };

    if (source) {
      options.cancelToken = source.token;
    }

    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      options.headers = {
        ...headers,
        Authorization: authToken
      };
    }

    return axios.request(options);
  }

  static source(): CancelTokenSource {
    return axios.CancelToken.source();
  }

  static isCancel(error: Record<string, unknown>): boolean {
    return axios.isCancel(error);
  }
}

export default Api;
