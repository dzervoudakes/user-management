module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}', '!<rootDir>/src/**/*.d.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: ['<rootDir>/test/**/*(*.)@(spec|test).{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.(ts|js)$': require.resolve('ts-jest')
  },
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@src[/](.+)': '<rootDir>/src/$1',
    '^node_modules[/](.+)': '<rootDir>/node_modules/$1'
  }
};
