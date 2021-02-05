import { Response, Request } from 'express';
import StatusCodes from 'http-status-codes';
import { Controller, Post } from '@overnightjs/core';
import { JwtManager } from '@overnightjs/jwt';
import { AdminDao } from '../daos';

@Controller('api/auth')
export class AuthController {
  private adminDao = new AdminDao();

  @Post('')
  private async generateToken(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.adminDao.getAdmin(req.body);
      if (result === null) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials.' });
      } else {
        const token = JwtManager.jwt(req.body);
        res.status(StatusCodes.OK).json({ token });
      }
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }
}

export default AuthController;
