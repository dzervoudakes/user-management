// Default config: https://github.com/dzervoudakes/dztools/blob/main/packages/formatting/eslint-config-typescript/index.js
const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: ['@dztools/eslint-config-typescript', 'plugin:jest/recommended'],
  rules: {
    'no-console': OFF,
    'no-underscore-dangle': OFF,
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: ['**/*.test.*', '**/*.spec.*']
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      }
    }
  }
};
