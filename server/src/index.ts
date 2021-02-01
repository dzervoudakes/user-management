import dotenv from 'dotenv';
import { Server } from '@overnightjs/core';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import { AuthController } from './controllers';

dotenv.config();

class AppServer extends Server {
  constructor() {
    super();

    this.app.use(cors());
    this.app.use(bodyParser.json());

    this.setupDatabaseConnection();
    this.setupControllers();
  }

  private setupDatabaseConnection(): void {
    mongoose.connect('mongodb://localhost:27017/user_management_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  private setupControllers(): void {
    const authController = new AuthController();
    // const userController = new UserController();

    super.addControllers([authController]);
  }

  public start(): void {
    const port = process.env.port || 3000;

    this.app.listen(port, () => {
      console.log(chalk.cyan(`Server running on port ${port}.`));
    });
  }
}

const server = new AppServer();

server.start();
