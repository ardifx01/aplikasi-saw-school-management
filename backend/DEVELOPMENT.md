# Development Workflow

## Project Structure

```
backend/
├── .env                 # Environment variables (gitignored)
├── .gitignore           # Git ignore patterns
├── docker-compose.yml   # MongoDB Docker configuration
├── docker-compose.override.yml  # Development tools (Mongo Express)
├── server.js            # Main application entry point
├── mongodb-example.js   # Example MongoDB connection
├── test-graceful-shutdown.js  # Graceful shutdown test script
├── package.json         # Project dependencies and scripts
├── README.md            # Project documentation
├── DEVELOPMENT.md       # Development workflow documentation
└── node_modules/        # Dependencies (gitignored)
```

## Development Process

1. Start MongoDB:
   ```bash
   npm run docker:up
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Run the application in development mode:
   ```bash
   npm run dev
   ```

4. For production, use:
   ```bash
   npm start
   ```

5. The application will be available at http://localhost:4001

## Docker Commands

- Start services: `npm run docker:up`
- Stop services: `npm run docker:down`
- View logs: `npm run docker:logs`

## Testing Graceful Shutdown

Run the test script to verify graceful shutdown works:
```bash
node test-graceful-shutdown.js
```

## Health Checks

The application provides a health check endpoint at:
```
GET http://localhost:4001/health
```

This endpoint returns:
- Application status
- Database connection status
- Current timestamp

## Environment Variables

The application uses the following environment variables:
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Application port (defaults to 4001)

These are defined in the `.env` file.

## Git Configuration

The project includes a `.gitignore` file that excludes:
- Node.js dependencies (`node_modules/`)
- Environment files (`.env`)
- Docker override files (`docker-compose.override.yml`)
- IDE configuration files
- Log files and other generated content

This ensures that sensitive configuration and generated files are not committed to the repository.