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

console.log('✅ CORS allowed origins:', allowedOrigins);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (curl, Render health checks, mobile apps)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`⛔ CORS blocked origin: ${origin}`);
            callback(new Error(`CORS blocked: ${origin}`));
        }
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
