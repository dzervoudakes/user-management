import { Server } from '@overnightjs/core';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { AuthController, UserController } from './controllers';

class AppServer extends Server {
  constructor() {
    super();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: process.env.CLIENT_ORIGIN || ''
      })
    );

    this.setupDatabaseConnection();
    this.setupControllers();
  }

  private async setupDatabaseConnection(): Promise<void> {
    await mongoose.connect(process.env.DB_CONNECTION_STRING || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(chalk.cyan('Database connection successful.'));
  }

  private setupControllers(): void {
    const authController = new AuthController();
    const userController = new UserController();

    super.addControllers([authController, userController]);
  }

  public start(): void {
    const PORT = process.env.PORT || 3000;

    this.app.listen(PORT, () => {
      console.log(chalk.cyan(`Server running on port ${PORT}.`));
    });
  }
}

export default AppServer;
