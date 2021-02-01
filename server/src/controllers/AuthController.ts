import { Response, Request } from 'express';
import StatusCodes from 'http-status-codes';
import { Controller, Post } from '@overnightjs/core';
import { Admin } from '../models';

// @todo remove eslint lines for explicit any, specifically for Promise<any> somehow???

@Controller('api/auth')
export class AuthController {
  @Post('')
  private getAll(req: Request, res: Response): any { // eslint-disable-line
    try {
      // @todo DAO layer/directory for this and User queries?
      // https://medium.com/@matheus.alvfr/a-simple-rest-jwt-typescript-application-14961aa29ce5#3a9c
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
