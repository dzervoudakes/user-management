/**
 * Build script that runs stylelint against all application style files.
 * @packageDocumentation
 */
import stylelint from 'stylelint';
import chalk from 'chalk';
import ora from 'ora';

process.on('unhandledRejection', (err) => {
  throw err;
});

const spinner = ora('Linting all styles...');
spinner.start();

const fix = process.argv.indexOf('--fix') !== -1;

stylelint
  .lint({ files: '**/*.scss', fix, formatter: 'string' })
  .then((result: { output: string; errored: boolean }) => {
    spinner.stop();
    console.log(result.output);

    if (!result.errored) {
      console.log(chalk.green('Style linting complete: no warnings or errors found.\n'));
    } else {
      throw new Error('Stylelint errors found.\n');
    }
  })
  .catch((error: { stack: string }) => {
    console.error(error.stack);
  });
