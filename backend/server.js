import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


import studentRoutes from './routes/studentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


dotenv.config();


const app = express();


// CORS (lock to your client origin)
app.use(cors());


// JSON parsing for non-multipart routes
app.use(express.json());


// API routes
app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes);


// health check
app.get('/health', (_, res) => res.json({ ok: true }));


const start = async () => {
try {
await mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB connected');
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on', port));
} catch (err) {
console.error(err);
process.exit(1);
}
};


start();
