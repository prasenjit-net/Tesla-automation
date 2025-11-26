import express, { Express, Request, Response } from 'express';
import path from 'path';
import { router as apiRouter } from './routes/api';

const app: Express = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRouter);

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from the dist/client directory in production
if (isProduction) {
    const clientPath = path.join(__dirname, 'client');

    // Serve static files with proper MIME types
    app.use(express.static(clientPath, {
        setHeaders: (res, filePath) => {
            if (filePath.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            } else if (filePath.endsWith('.mjs')) {
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            } else if (filePath.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css; charset=utf-8');
            }
        }
    }));

    // Handle client-side routing - send all non-API requests to index.html
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    if (isProduction) {
        console.log(`🌐 Serving frontend at http://localhost:${port}`);
    } else {
        console.log(`🔧 Development mode - run frontend separately with: npm run dev:client`);
    }
});
