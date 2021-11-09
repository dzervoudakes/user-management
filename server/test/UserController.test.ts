import StatusCodes from 'http-status-codes';
import supertest, { SuperTest, Test } from 'supertest';

import { UserController } from '@src/controllers';

import { mockUserOne, mockUserTwo, TestServer } from './utils';

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
  const errorMessage = 'User not found.';
  const userController = new UserController();
  let agent: SuperTest<Test>;

  beforeAll(async () => {
    const server = new TestServer();
    await server.setController(userController);
    agent = supertest.agent(server.getExpressInstance());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('returns a list of users', async () => {
      mockGetUsers.mockImplementationOnce(() => [mockUserOne, mockUserTwo]);
      const result = await agent.get('/api/users');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body.users.length).toBe(2);
    });

    it('handles bad requests', async () => {
      mockGetUsers.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.get('/api/users');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('getUser', () => {
    it('returns a user by id', async () => {
      mockGetUser.mockImplementationOnce(() => mockUserOne);
      const result = await agent.get('/api/users/12345');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body).toEqual({ user: mockUserOne });
    });

    it('handles bad requests', async () => {
      mockGetUser.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.get('/api/users/12345');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('handles user not found', async () => {
      mockGetUser.mockImplementationOnce(() => null);
      const result = await agent.get('/api/users/12345');

      expect(result.status).toBe(StatusCodes.NOT_FOUND);
      expect(JSON.parse(result.text)).toEqual({ error: errorMessage });
    });
  });

  describe('createUser', () => {
    it('returns a new user', async () => {
      mockCreateUser.mockImplementationOnce(() => mockUserOne);
      const result = await agent.post('/api/users');

      expect(result.status).toBe(StatusCodes.CREATED);
      expect(result.body).toEqual({ user: mockUserOne });
    });

    it('handles bad requests', async () => {
      mockCreateUser.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.post('/api/users');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('udpateUser', () => {
    it('returns an updated user', async () => {
      mockUpdateUser.mockImplementationOnce(() => mockUserOne);
      const result = await agent.put('/api/users/12345');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body).toEqual({ user: mockUserOne });
    });

    it('handles bad requests', async () => {
      mockUpdateUser.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.put('/api/users/12345');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('handles user not found', async () => {
      mockUpdateUser.mockImplementationOnce(() => null);
      const result = await agent.put('/api/users/12345');

      expect(result.status).toBe(StatusCodes.NOT_FOUND);
      expect(JSON.parse(result.text)).toEqual({ error: errorMessage });
    });
  });

  describe('deleteUser', () => {
    it('returns an empty object when deleting a user', async () => {
      mockDeleteUser.mockImplementationOnce(() => ({}));
      const result = await agent.delete('/api/users/12345');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body).toEqual({});
    });

    it('handles bad requests', async () => {
      mockDeleteUser.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.delete('/api/users/12345');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('handles user not found', async () => {
      mockDeleteUser.mockImplementationOnce(() => null);
      const result = await agent.delete('/api/users/12345');

      expect(result.status).toBe(StatusCodes.NOT_FOUND);
      expect(JSON.parse(result.text)).toEqual({ error: errorMessage });
    });
  });
});
