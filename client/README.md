# User Management Frontend
> Demo CRUD SPA made with React + TypeScript.

[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

## Build Scripts

### Install Dependencies
```
npm install
```

### Start Local Server on Port 8080
```
npm start
```

### Run Linting
```
npm run lint
```

### Run Linting with Fix
```
npm run lint:fix
```

### Run Style Linting
```
npm run stylelint
```

### Run Style Linting with Fix
```
npm run stylelint:fix
```

### Run Unit Tests
```
npm test
```

### Run Unit Tests with Coverage Report
```
npm run test:coverage
```

### Run Unit Tests with Verbose Results
```
npm run test:verbose
```

### Run Unit Tests and Watch for Changes
```
npm run test:watch
```

### Build for Production
```
npm run build
```

### Build for Production with Bundle Analyzer Report
```
npm run build:report
```

### Generate Documentation
```
npm run docs
```

### Remove All Build Directories
```
npm run clean
```

## Technical Requirements
> The runtime environment for this application requires `node >= 14.6.0` and `npm >= 6.14.7`.

## Configuration
> This application makes use of `ESLint`, `Stylelint` and `EditorConfig`. Each of these features requires
> an extension be installed in order to work properly with IDEs and text editors such as VSCode.

## Content Structure
- API wrapper methods live under `./src/api`
- Shared components live under `./src/components`
- Application state management lives under `./src/context`
- Higher order components live under `./src/hocs`
- Custom hooks to retrieve and affect application state live under `./src/hooks`
- Top-level page view components live under `./src/pages`
- Application routes live under `./src/routes`
- Default styles live under `./src/scss`
- API services live under `./src/services`
- Material UI themes live under `./src/theme`
- The inherited Webpack config aliases `@src/*` as an absolute import path to `./src/*`
