/**
 * Build script that runs stylelint against all application style files.
 * @packageDocumentation
 */
import chalk from 'chalk';
import ora from 'ora';
import stylelint from 'stylelint';

process.on('unhandledRejection', (err) => {
  throw err;
});

(async (): Promise<void> => {
  const spinner = ora('Linting all styles...');
  spinner.start();

  const fix = process.argv.indexOf('--fix') !== -1;
  const results = await stylelint.lint({
    files: ['**/*.scss', '**/*.css'],
    fix,
    formatter: 'string'
  });

  spinner.stop();
  console.log(results.output);

  if (!results.errored) {
    console.log(chalk.green('Style linting complete: no warnings or errors found.\n'));
  } else {
    throw new Error('Stylelint errors found.\n');
  }
})().catch((error: { stack: string }) => {
  console.error(error.stack);
});
