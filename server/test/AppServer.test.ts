import supertest, { SuperTest, Test } from 'supertest';
import StatusCodes from 'http-status-codes';
import { Application } from 'express';
import AppServer from '@src/AppServer';

jest.mock('@overnightjs/jwt', () => ({
  JwtManager: { jwt: jest.fn().mockImplementation(() => 'i am a token') }
}));

jest.mock('mongoose', () => ({
  ...(jest.requireActual('mongoose') as jest.Mock),
  connect: jest.fn()
}));

jest.mock('@src/controllers/UserController');

const mockGetAdmin = jest.fn();

jest.mock('@src/daos/AdminDao', () => {
  return {
    AdminDao: jest.fn().mockImplementation(() => {
      return {
        getAdmin: mockGetAdmin
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

  it('calls the auth controller', async () => {
    mockGetAdmin.mockImplementationOnce(() => ({
      username: 'username',
      password: 'password'
    }));
    const result = await agent.post('/api/auth');

    expect(result.status).toBe(StatusCodes.OK);
    expect(result.body.token).toEqual('i am a token');
  });
});
