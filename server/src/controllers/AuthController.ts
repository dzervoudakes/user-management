import { Response, Request } from 'express';
import StatusCodes from 'http-status-codes';
import { Controller, Post } from '@overnightjs/core';

// @todo remove eslint lines for explicit any, specifically for Promise<any> somehow???

@Controller('api/auth')
export class AuthController {
  @Post('')
  private async getAll(req: Request, res: Response): Promise<any> { // eslint-disable-line
    try {
      const mock = (): { data: Record<string, unknown> } => ({
        data: { hello: 'hi there' }
      });
      const result = await mock();
      res.status(StatusCodes.OK).json(result.data);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default AuthController;
