// Default config: https://github.com/dzervoudakes/dztools/blob/main/packages/formatting/eslint-config-react-typescript/index.js
const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: ['@dztools/eslint-config-react-typescript'],
  overrides: [
    {
      files: ['webpack.config.js', 'build/**/*.js', 'scripts/*.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': OFF,
        'no-console': OFF,
        'jest/no-jest-import': OFF
      }
    }
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: [
          'webpack.config.js',
          'build/**',
          'scripts/**',
          '**/*.test.*',
          '**/*.spec.*'
        ]
      }
    ],
    // MongoDB utilizes '_id' with a dangling underscore
    'no-underscore-dangle': OFF,
    // jsx transform is enabled in this application: no need to enforce 'react-in-jsx-scope'
    'react/react-in-jsx-scope': OFF
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.js'
      }
    }
  }
};
