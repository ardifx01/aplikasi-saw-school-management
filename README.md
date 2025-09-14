# School Management System

A full-stack school management application with a Next.js frontend and Node.js/Express backend, using MongoDB for data storage.

## Features

### Frontend (Admin Dashboard)
- Modern admin dashboard with monochromatic theme
- Login and registration pages
- Sidebar navigation with collapsible menu
- Dashboard overview with statistics
- Users management page
- Documents management page
- Tasks management page
- Settings page

### Backend
- Express.js server with REST API endpoints
- MongoDB integration with Mongoose ODM
- Docker Compose setup for easy development environment
- Graceful shutdown handling for proper resource cleanup
- Environment-based configuration
- Health check endpoints

## Project Structure

```
.
├── backend/             # Node.js backend service
│   ├── server.js        # Main application entry point
│   ├── docker-compose.yml  # MongoDB Docker configuration
│   └── ...              # Other backend files
└── frontend/            # Next.js frontend application
    ├── app/             # Next.js app directory
    ├── components/      # Reusable components
    └── ...              # Other frontend files
```

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn package manager

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start MongoDB using Docker:
   ```bash
   npm run docker:up
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the backend application:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. The backend will be available at http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

See the individual README files in the `backend/` and `frontend/` directories for detailed development information:

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)