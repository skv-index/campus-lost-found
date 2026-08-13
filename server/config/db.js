import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

// Fix for Windows / Node.js querySrv ECONNREFUSED DNS resolution issues
// Must run BEFORE importing mongoose so the mongodb driver uses updated DNS servers
try {
    dns.setDefaultResultOrder('ipv4first');
} catch (e) {
    console.warn('DNS server configuration warning:', e.message);
}

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
            console.warn('⚠️  MONGODB_URI is not configured with valid Atlas credentials in .env file.');
            console.warn('⚠️  Please update .env with your real MongoDB Atlas connection string.');
        }

        const conn = await mongoose.connect(uri || 'mongodb://localhost:27017/campus-smart');
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // Do not crash server so user receives informative error messages
    }
};

export default connectDB;
