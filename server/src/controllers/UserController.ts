import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { Controller, Delete, Get, Middleware, Post, Put } from '@overnightjs/core';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import { UserDao } from '@src/daos';

@Controller('api/users')
export class UserController {
  private userDao = new UserDao();

  @Get('')
  @Middleware(JwtManager.middleware)
  private async getUsers(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const users = await this.userDao.getUsers();
      res.status(StatusCodes.OK).json({ users });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }

  @Get(':id')
  @Middleware(JwtManager.middleware)
  private async getUser(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const user = await this.userDao.getUser(req.params.id);
      if (user === null) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        res.status(StatusCodes.OK).json({ user });
      }
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }

  @Post('')
  @Middleware(JwtManager.middleware)
  private async createUser(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const user = await this.userDao.createUser(req.body);
      res.status(StatusCodes.CREATED).json({ user });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }

  @Put(':id')
  @Middleware(JwtManager.middleware)
  private async updateUser(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const user = await this.userDao.updateUser(req.params.id, req.body);
      if (user === null) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        res.status(StatusCodes.OK).json({ user });
      }
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }

  @Delete(':id')
  @Middleware(JwtManager.middleware)
  private async deleteUser(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const user = await this.userDao.deleteUser(req.params.id);
      if (user === null) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        res.status(StatusCodes.OK).json({});
      }
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }
}

export default UserController;
