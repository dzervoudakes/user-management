// Default config: https://github.com/dzervoudakes/dztools/blob/main/packages/formatting/eslint-config-typescript/index.js
const OFF = 0;

module.exports = {
  extends: ['@dztools/eslint-config-typescript'],
  rules: {
    'no-console': OFF
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      }
    }
  }
};
