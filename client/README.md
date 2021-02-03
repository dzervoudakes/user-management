# User Management Frontend
> Demo CRUD SPA made with React + TypeScript.

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

### Remove All Output Directories
```
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
