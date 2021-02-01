import dotenv from 'dotenv';
import express from 'express';
import { Server } from '@overnightjs/core';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { AuthController } from './controllers';

dotenv.config();

class AppServer extends Server {
  constructor() {
    super();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.setupDatabaseConnection();
    this.setupControllers();
  }

  private setupDatabaseConnection(): void {
    mongoose
      .connect('mongodb://mongo:27017', {
        dbName: 'user-management',
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log(chalk.cyan('Database connection successful.'));
      })
      .catch((err) => {
        throw err;
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
