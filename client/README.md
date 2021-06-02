# User Management Frontend

> Demo CRUD SPA made with React + TypeScript.

## Build Scripts

### Install Dependencies

```sh
npm install
```

### Start Local Server on Port 8080

```sh
npm start
```

### Run Linting

```sh
npm run lint
```

### Run Linting with Fix

```sh
npm run lint:fix
```

### Run Style Linting

```sh
npm run stylelint
```

### Run Style Linting with Fix

```sh
npm run stylelint:fix
```

### Run Unit Tests

```sh
npm test
```

### Run Unit Tests with Coverage Report

```sh
npm run test:coverage
```

### Run Unit Tests with Verbose Results

```sh
npm run test:verbose
```

### Run Unit Tests and Watch for Changes

```sh
npm run test:watch
```

### Build for Production

```sh
npm run build
```

### Build for Production with Bundle Analyzer Report

```sh
npm run build:report
```

### Generate Documentation

```sh
npm run docs
```

### Remove Output Directories

```sh
npm run clean
```

## Environment

The following environment variables are used throughout the SPA. Default values are provided via the `webpack.base.js` file in the `./build` directory.

| Variable      | Default                 | Description                                            |
| ------------- | ----------------------- | ------------------------------------------------------ |
| NODE_ENV      | `development`           | Dictates which `webpack` bundle to use at build time   |
| API_BASE_URL  | `http://localhost:3000` | Base origin for sending network requests               |
| AUTH_USERNAME | `admin`                 | Fake auth user for accessing resources from the server |
| AUTH_PASSWORD | `letmein`               | Straight forward password, because we love security ❤️  |
