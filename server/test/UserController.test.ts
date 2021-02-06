import supertest, { SuperTest, Test } from 'supertest';
import StatusCodes from 'http-status-codes';
import { UserController } from '@src/controllers';
import { TestServer, mockUserOne, mockUserTwo } from './utils';

jest.mock('@overnightjs/core', () => ({
  ...(jest.requireActual('@overnightjs/core') as jest.Mock),
  Middleware: () => jest.fn()
}));

jest.mock('@overnightjs/jwt', () => ({
  ...(jest.requireActual('@overnightjs/jwt') as jest.Mock),
  JwtManager: { middleware: jest.fn() }
}));

const mockGetUsers = jest.fn();
const mockGetUser = jest.fn();
const mockCreateUser = jest.fn();
const mockUpdateUser = jest.fn();
const mockDeleteUser = jest.fn();

jest.mock('@src/daos/UserDao', () => {
  return {
    UserDao: jest.fn().mockImplementation(() => {
      return {
        getUsers: mockGetUsers,
        getUser: mockGetUser,
        createUser: mockCreateUser,
        updateUser: mockUpdateUser,
        deleteUser: mockDeleteUser
      };
    })
  };
});

describe('UserController', () => {
  const userController = new UserController();
  let agent: SuperTest<Test>;

  beforeAll(async () => {
    const server = new TestServer();
    await server.setController(userController);
    agent = supertest.agent(server.getExpressInstance());
  });

  describe('success responses', () => {
    it('returns a list of users', async () => {
      mockGetUsers.mockImplementationOnce(() => [mockUserOne, mockUserTwo]);
      const result = await agent.get('/api/users');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body.users.length).toBe(2);
    });

    it('returns a user by id', async () => {
      mockGetUser.mockImplementationOnce(() => mockUserOne);
      const result = await agent.get('/api/users/12345');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body).toEqual({ user: mockUserOne });
    });

    it('returns a new user', async () => {
      mockCreateUser.mockImplementationOnce(() => mockUserOne);
      const result = await agent.post('/api/users');

      expect(result.status).toBe(StatusCodes.CREATED);
      expect(result.body).toEqual({ user: mockUserOne });
    });

    it('returns an updated user', async () => {
      mockUpdateUser.mockImplementationOnce(() => mockUserOne);
      const result = await agent.put('/api/users/12345');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body).toEqual({ user: mockUserOne });
    });

    it('returns an empty object when deleting a user', async () => {
      mockDeleteUser.mockImplementationOnce(() => ({}));
      const result = await agent.delete('/api/users/12345');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body).toEqual({});
    });
  });
});
