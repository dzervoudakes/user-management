import { Server } from '@overnightjs/core';
import express, { Application } from 'express';

export class TestServer extends Server {
  constructor() {
    super();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public setController<T>(controller: T): void {
    super.addControllers(controller);
  }

  public getExpressInstance(): Application {
    return this.app;
  }
}

export default TestServer;
