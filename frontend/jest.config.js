// Default config: https://github.com/dzervoudakes/dztools/blob/main/packages/testing/jest-config-react-typescript/jest-preset.js
module.exports = {
  preset: '@dztools/jest-config-react-typescript',
  coveragePathIgnorePatterns: ['src/index.tsx', 'src/polyfills.ts', 'src/theme']
};
