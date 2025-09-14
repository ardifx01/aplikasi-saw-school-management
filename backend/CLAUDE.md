# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Build and Development:**
- `npm run build` - Compile TypeScript to dist/ directory (includes copying .env file)
- `npm run dev` - Run development server with ts-node and path resolution
- `npm run dev:watch` - Run development server with nodemon auto-restart
- `npm start` - Run production server from dist/server.js
- `npm run clean` - Remove dist directory
- `npm run typecheck` - Run TypeScript type checking without compilation

**Database (Docker):**
- `npm run docker:up` - Start MongoDB and Mongo Express containers
- `npm run docker:down` - Stop all containers
- `npm run docker:logs` - View container logs
- `npm run docker:rebuild` - Rebuild and restart containers with no cache

**Testing:**
- `npm run test` - No automated test suite configured (placeholder)
- `npm run lint` - No linter configured (placeholder)
- `node test-graceful-shutdown.js` - Manual test for graceful shutdown functionality

## Modular Architecture

This is a TypeScript-based Express.js backend with a modular, enterprise-grade architecture:

**Directory Structure:**
```
src/
├── config/          # Configuration modules
│   ├── database.ts  # Singleton database connection manager
│   ├── environment.ts # Environment validation and config
│   └── cors.ts      # CORS configuration for frontend integration
├── controllers/     # Request handlers (business logic)
│   ├── apiController.ts
│   └── healthController.ts
├── middleware/      # Express middleware
│   ├── errorHandler.ts # Global error handling and async wrapper
│   └── requestLogger.ts # HTTP request logging
├── routes/          # Route definitions
│   ├── index.ts     # Main router
│   ├── apiRoutes.ts
│   └── healthRoutes.ts
├── services/        # Business logic and external services
│   └── gracefulShutdown.ts # Application lifecycle management
├── types/           # TypeScript type definitions
│   ├── common.ts    # Common interfaces
│   ├── enums.ts     # Application enums (UserRole, ApiStatus, etc.)
│   └── env.d.ts     # Environment variable types
├── utils/           # Utility functions
│   └── logger.ts    # Structured logging service
├── models/          # Database models (empty, ready for Mongoose schemas)
├── app.ts           # Express app configuration
├── server.ts        # Application entry point
└── index.ts         # Module exports
```

**Core Technologies:**
- Express.js server with TypeScript
- MongoDB with Mongoose ODM (singleton pattern)
- Docker Compose for local development
- Path aliases using tsconfig-paths
- Structured logging system
- Comprehensive error handling

**Key Features:**
- **Singleton Database Connection**: Centralized connection management with health monitoring
- **Structured Error Handling**: Global error middleware with operational error classification
- **Request/Response Logging**: Structured HTTP request logging with timing
- **Graceful Shutdown**: Proper resource cleanup on application termination
- **Path Aliases**: Clean imports using `@/*` syntax
- **Environment Validation**: Startup-time validation of required environment variables
- **Health Monitoring**: Comprehensive health check endpoint with system metrics
- **CORS Configuration**: Secure cross-origin requests from frontend ports 3000-3003

**API Endpoints:**
- `GET /api/v1/` - API information endpoint
- `GET /api/v1/health` - Health check with database status, uptime, and memory usage

**User Roles (Enum):**
- `UserRole.ADMIN` - System administrator
- `UserRole.PRINCIPAL` - School principal
- `UserRole.OPERATOR` - System operator

**Development Environment:**
- MongoDB runs in Docker (port 27017) with authentication
- Mongo Express admin UI available at port 8081
- Application runs on port 4001 (configurable via .env)
- TypeScript compilation with strict settings and source maps
- Hot reload with nodemon

**Database Configuration:**
- Connection string: `mongodb://admin:password@localhost:27017/schoolmanagement?authSource=admin`
- Database name: schoolmanagement
- Authentication required (admin/password)
- Singleton connection manager with automatic reconnection

**Testing:**
- Postman collection available at `postman/School_Management_API.postman_collection.json`
- Environment file at `postman/Environment.postman_environment.json`
- Automated tests for health endpoints and error handling

**CORS Configuration:**
- **Allowed Origins**: `localhost:3000`, `localhost:3001`, `localhost:3002`, `localhost:3003`
- **Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Credentials**: Enabled (allows cookies and authorization headers)
- **Custom Origins**: Set `ALLOWED_ORIGINS=url1,url2,url3` in .env for production

**Environment Variables:**
```bash
# Required
MONGODB_URI=mongodb://admin:password@localhost:27017/schoolmanagement?authSource=admin
PORT=4001

# Optional
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001  # CORS origins
JWT_SECRET=your-secret-key                                   # JWT signing key
JWT_EXPIRES_IN=7d                                           # JWT expiration
LOG_LEVEL=info                                              # Logging level
```

## Important Notes

- Always start MongoDB containers before running the application
- Use path aliases (`@/config`, `@/utils`, etc.) for all internal imports
- All controllers use `asyncHandler` wrapper for proper error handling
- The application uses structured logging - avoid console.log
- Environment variables are validated at startup
- Database connection failures don't crash the application
- All routes return standardized JSON responses with `success` field
- CORS is configured for frontend access from ports 3000-3003
- Origins are validated and logged in development mode