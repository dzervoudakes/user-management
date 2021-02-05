import supertest, { SuperTest, Test } from 'supertest';
import StatusCodes from 'http-status-codes';
import { UserController } from '@src/controllers';
import TestServer from './utils/TestServer';

// @todo mock JWT package
// @todo mock UserDao

describe('UserController', () => {
  const userController = new UserController();
  let agent: SuperTest<Test>;

  beforeAll(async () => {
    const server = new TestServer();
    await server.setController(userController);
    agent = supertest.agent(server.getExpressInstance());
  });

  it('returns a list of users', async () => {
    const result = await agent.get('/api/users');

    expect(result.status).toBe(StatusCodes.OK);
    expect(result.body.users.length).toBe(2);
  });
});
