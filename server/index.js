import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import itemsRoutes from './routes/items.js';
import claimsRoutes from './routes/claims.js';

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
const devOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'];
const envOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : [];
const allowedOrigins = [...new Set([...devOrigins, ...envOrigins])];

// Vite auto-increments ports (5173 -> 5174 -> 5175...) when one is busy,
// so allow ANY localhost / 127.0.0.1 port in development instead of a fixed list.
const localhostPattern = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

// Also allow all Vercel preview deployments for this project
const vercelPreviewPattern = /^https:\/\/campus-lost-found[a-z0-9-]*\.vercel\.app$/;

console.log('✅ CORS allowed origins:', allowedOrigins);

app.use(cors({
    origin: (origin, callback) => {
        // Allow no-origin requests (curl, Render health checks, mobile apps)
        if (!origin) return callback(null, true);
        // Allow exact matches
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // Allow any local dev server port (fixes CORS blocked: http://localhost:5174)
        if (localhostPattern.test(origin)) return callback(null, true);
        // Allow all Vercel preview URLs for this project
        if (vercelPreviewPattern.test(origin)) return callback(null, true);

        console.warn(`⛔ CORS blocked origin: ${origin}`);
        callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Item photos are submitted as base64 data URLs. Express defaults to 100 KB,
// which rejects normal photos before the items route receives the request.
app.use(express.json({ limit: '8mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/claims', claimsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Campus Smart API Server is running' });
});

// Return JSON (never HTML) for unknown /api/* routes.
// Without this, frontend fetch().json() crashes with
// "Unexpected token '<', '<!DOCTYPE ...' is not valid JSON".
app.use('/api', (req, res) => {
    res.status(404).json({ message: `API route not found: ${req.method} ${req.originalUrl}` });
});

// Central error handler — always JSON, even for body-parser SyntaxError
// (malformed JSON body) which Express otherwise renders as an HTML page.
// MUST be registered after all routes (4-arg signature).
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (err?.type === 'entity.parse.failed' || err instanceof SyntaxError) {
        return res.status(400).json({ message: 'Invalid JSON in request body.' });
    }
    if (err?.message?.startsWith('CORS blocked')) {
        return res.status(403).json({ message: err.message });
    }
    console.error('Unhandled server error:', err);
    const status = err?.status || 500;
    res.status(status).json({ message: err?.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
