# User Management Backend
> Demo CRUD server made with Node + Express.

## Build Scripts

### Install Dependencies
```
npm install
```

### Host Server on Port 3000
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

### Build for Production
```
npm run build
```

### Remove All Build Directories
```
npm run clean
```

## Environment

The following environment variables are used throughout the server. Default values are provided via the `docker-compose.yml` file at the project root.

| Variable             | Default                                     | Description                                                                    |
| -------------------- | ------------------------------------------- | ------------------------------------------------------------------------------ |
| CLIENT_ORIGIN        | `http://localhost:8080`                     | Allowed web client origin for CORS                                             |
| DB_CONNECTION_STRING | `mongodb://mongo:27017/user-management`     | Connection string for the MongoDB instance                                     |
| PORT                 | `3000`                                      | The server port for web clients to interact with, i.e. `http://localhost:3000` |
| OVERNIGHT_JWT_SECRET | `my super long random string for fake auth` | Secret used by Overnight.js for JWT generation                                 |
| OVERNIGHT_JWT_EXP    | `24h`                                       | JWT token expiration time after creation, used by Overnight.js                 |
