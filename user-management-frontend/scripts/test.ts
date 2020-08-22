/**
 * Build script that runs unit tests with Jest.
 * @packageDocumentation
 */
import * as jest from 'jest';

process.env.NODE_ENV = 'test';

process.on('unhandledRejection', (err) => {
  throw err;
});

const argv = process.argv.slice(2);

jest.run(argv);
