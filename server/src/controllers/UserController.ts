import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { Controller, Get, Middleware } from '@overnightjs/core';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import { UserDao } from '../daos';

@Controller('api/users')
export class UserController {
  private userDao = new UserDao();

  @Get('')
  @Middleware(JwtManager.middleware)
  private async getUsers(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const users = await this.userDao.getUsers();
      res.status(StatusCodes.OK).json({ users });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }

  // @todo getUser

  // @todo createUser

  // @todo updateUser

  // @todo deleteUser
}

export default UserController;
