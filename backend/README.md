# School Management System - Backend

A Node.js backend for a school management system with MongoDB database integration, Docker support, and graceful shutdown functionality.

## Features

- Express.js server with REST API endpoints
- MongoDB integration with Mongoose ODM
- Docker Compose setup for easy development environment
- Graceful shutdown handling for proper resource cleanup
- Environment-based configuration
- Health check endpoints
- Development and production npm scripts

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn package manager

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
└── node_modules/        # Dependencies (gitignored)
```

## Docker Setup

This project includes Docker Compose configuration for running MongoDB.

### Running MongoDB with Docker

1. Make sure you have Docker and Docker Compose installed
2. Run the following command to start MongoDB:

```bash
npm run docker:up
```

This will start:
- MongoDB database on port 27017
- Mongo Express (admin UI) on port 8081

3. To stop the services:

```bash
npm run docker:down
```

### Accessing MongoDB

- Connection string: `mongodb://admin:password@localhost:27017/schoolmanagement?authSource=admin`
- Mongo Express UI: http://localhost:8081

## Environment Variables

The `.env` file contains the MongoDB connection string that the application will use:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://admin:password@localhost:27017/schoolmanagement?authSource=admin

# Port for the Node.js application
PORT=4001
```

## Running the Application

1. Start MongoDB using Docker:
   ```bash
   npm run docker:up
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. The application will be available at http://localhost:4001

## API Endpoints

- `GET /` - Main API endpoint
- `GET /health` - Health check endpoint that shows the status of the application and database connection

## Graceful Shutdown

The application implements graceful shutdown that:
- Closes MongoDB connections properly
- Handles SIGTERM and SIGINT signals
- Handles uncaught exceptions and unhandled promise rejections

To test graceful shutdown, press Ctrl+C in the terminal where the application is running, or send a SIGTERM signal to the process.

### Testing Graceful Shutdown

You can test the graceful shutdown functionality with the provided test script:

```bash
node test-graceful-shutdown.js
```

This script will start the server and automatically send a SIGINT signal after 5 seconds to trigger the graceful shutdown process.

## Development Workflow

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed information about the development process, project structure, and workflow.

## Git Configuration

The project includes a `.gitignore` file that excludes:
- Node.js dependencies (`node_modules/`)
- Environment files (`.env`)
- Docker override files (`docker-compose.override.yml`)
- IDE configuration files
- Log files and other generated content

This ensures that sensitive configuration and generated files are not committed to the repository.