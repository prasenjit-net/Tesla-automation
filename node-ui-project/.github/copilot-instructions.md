This is a full-stack TypeScript web application in a unified monorepo structure:

## Architecture
- **Single Project**: Unified package.json at root with both backend and frontend dependencies
- **Backend**: Node.js/Express TypeScript server (port 3000) in `src/`
- **Frontend**: React SPA with Vite in `client/`
- **Routing**: TanStack Router for client-side navigation
- **Data Fetching**: TanStack Query for server state management

## Project Structure
- `src/` - Express TypeScript server with REST API routes
- `client/` - React application source code
- `dist/` - Production build output (backend + frontend)
- `tsconfig.server.json` - Backend TypeScript configuration
- `tsconfig.client.json` - Frontend TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `.vscode/tasks.json` - VS Code tasks for running servers

## Development
- `npm run dev` - Runs both backend and frontend concurrently
- `npm run dev:server` - Runs backend only on http://localhost:3000
- `npm run dev:client` - Runs frontend only on http://localhost:5173

Frontend dev server proxies `/api` requests to backend during development.

## Production
- `npm run build` - Builds both frontend and backend
- `NODE_ENV=production npm start` - Serves frontend at `/` and API at `/api` from single server

## API Integration
Frontend proxies `/api` requests to backend in dev. In production, Express serves static frontend files and handles API routes on the same server.
