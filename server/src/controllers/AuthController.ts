import { Response, Request } from 'express';
import mongoose from 'mongoose';
import StatusCodes from 'http-status-codes';
import { Controller, Post } from '@overnightjs/core';
import { AdminSchema } from '../models';

// @todo remove eslint lines for explicit any, specifically for Promise<any> somehow???

@Controller('api/auth')
export class AuthController {
  @Post('')
  private getAll(req: Request, res: Response): any { // eslint-disable-line
    const Admin = mongoose.model('Admin', AdminSchema);

    try {
      // @todo DAO layer/directory for this and User queries?
      Admin.find({}, (err, results) => {
        if (!err) {
          res.status(StatusCodes.OK).json(results);
        } else {
          throw err;
        }
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default AuthController;
