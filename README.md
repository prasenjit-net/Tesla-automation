# Full-Stack TypeScript Web Application

A modern full-stack web application built with TypeScript, featuring a Node.js/Express backend and React frontend in a unified monorepo structure.

## Tech Stack

### Backend
- **Node.js** with **Express** - Web server framework
- **TypeScript** - Type-safe JavaScript
- **tsx** - TypeScript execution and hot reload

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **TanStack Query** - Data fetching and caching
- **TanStack Router** - Client-side routing

## Project Structure

```
tesla-automation/
├── src/                # Backend source code
│   ├── index.ts        # Server entry point
│   └── routes/
│       └── api.ts      # REST API routes
├── client/             # Frontend source code
│   ├── main.tsx        # App entry point
│   ├── index.html      # HTML template
│   ├── routeTree.tsx   # Router configuration
│   └── routes/
│       ├── Home.tsx
│       └── Items.tsx
├── dist/               # Production build output
│   ├── index.js        # Compiled backend
│   └── client/         # Built frontend assets
├── package.json        # Unified dependencies
├── tsconfig.json       # Root TypeScript config
├── tsconfig.server.json # Backend TypeScript config
├── tsconfig.client.json # Frontend TypeScript config
├── vite.config.ts      # Vite configuration
└── .vscode/
    └── tasks.json      # VS Code tasks
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run both backend and frontend together:

```bash
npm run dev
```

This starts:
- Backend server at http://localhost:3000
- Frontend dev server at http://localhost:5173 (with API proxy to backend)

Or run them separately:

```bash
# Terminal 1 - Backend only
npm run dev:server

# Terminal 2 - Frontend only
npm run dev:client
```

### VS Code Tasks

Use the built-in VS Code tasks:
- **Start Development** - Run both servers concurrently
- **Start Backend Only** - Run backend server only
- **Start Frontend Only** - Run frontend dev server only
- **Build Production** - Build both frontend and backend

## API Endpoints

The backend provides a REST API for managing items:

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get a specific item
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item
- `GET /health` - Health check

## Building for Production

Build the entire application:

```bash
npm run build
```

This will:
1. Build the frontend into `dist/client/`
2. Compile the backend TypeScript to `dist/`

Start the production server:

```bash
NODE_ENV=production npm start
```

In production mode, the Express server serves the built frontend at `/` and API routes at `/api`.

## Architecture

### Development Mode
- Frontend runs on Vite dev server (port 5173) with HMR
- Backend runs on Express (port 3000)
- Vite proxies `/api` requests to backend

### Production Mode
- Single Express server (port 3000)
- Serves static frontend files from `dist/client/` at `/`
- API routes available at `/api`
- Client-side routing handled by serving `index.html` for all non-API routes

## Features

### Backend
- ✅ RESTful API with Express
- ✅ TypeScript for type safety
- ✅ Hot reload during development
- ✅ Serves static frontend in production

### Frontend
- ✅ React 18 with TypeScript
- ✅ Client-side routing with TanStack Router
- ✅ Data fetching with TanStack Query
- ✅ Optimistic updates and caching
- ✅ Dark mode styling
- ✅ Hot module replacement in dev

## Type Checking

```bash
npm run type-check
```

## Next Steps

- Add authentication (JWT, OAuth, etc.)
- Implement database integration (PostgreSQL, MongoDB, etc.)
- Add input validation (Zod, Yup, etc.)
- Set up testing (Jest, Vitest, React Testing Library)
- Configure environment variables
- Add Docker support
- Set up CI/CD pipeline

## License

ISC
