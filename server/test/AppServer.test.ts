import { Application } from 'express';
import StatusCodes from 'http-status-codes';
import supertest, { SuperTest, Test } from 'supertest';

import AppServer from '@src/AppServer';

import { mockUserOne, mockUserTwo } from './utils';

jest.mock('@overnightjs/core', () => ({
  ...(jest.requireActual('@overnightjs/core') as jest.Mock),
  Middleware: () => jest.fn()
}));

jest.mock('@overnightjs/jwt', () => ({
  JwtManager: {
    jwt: jest.fn().mockImplementation(() => 'i am a token'),
    middleware: jest.fn()
  }
}));

jest.mock('mongoose', () => ({
  ...(jest.requireActual('mongoose') as jest.Mock),
  connect: jest.fn()
}));

const mockGetAdmin = jest.fn();
const mockGetUsers = jest.fn();

jest.mock('@src/daos/AdminDao', () => {
  return {
    AdminDao: jest.fn().mockImplementation(() => {
      return {
        getAdmin: mockGetAdmin
      };
    })
  };
});

jest.mock('@src/daos/UserDao', () => {
  return {
    UserDao: jest.fn().mockImplementation(() => {
      return {
        getUsers: mockGetUsers,
        getUser: jest.fn(),
        createUser: jest.fn(),
        updateUser: jest.fn(),
        deleteUser: jest.fn()
      };
    })
  };
});

class MockServer extends AppServer {
  public getExpressInstance(): Application {
    return this.app;
  }
}

describe('AppServer', () => {
  let agent: SuperTest<Test>;

  beforeAll(() => {
    const server = new MockServer();
    agent = supertest.agent(server.getExpressInstance());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls the auth controller', async () => {
    mockGetAdmin.mockImplementationOnce(() => ({
      username: 'username',
      password: 'password'
    }));
    const result = await agent.post('/api/auth');

    expect(result.status).toBe(StatusCodes.OK);
    expect(result.body.token).toEqual('i am a token');
  });

  it('calls the user controller', async () => {
    mockGetUsers.mockImplementationOnce(() => [mockUserOne, mockUserTwo]);
    const result = await agent.get('/api/users');

    expect(result.status).toBe(StatusCodes.OK);
    expect(result.body.users).toEqual([mockUserOne, mockUserTwo]);
  });
});
