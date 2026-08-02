import express from 'express';
import authRoutes from './routes/auth.js';
import siteRoutes from './routes/sites.js';
import bookingRoutes from './routes/bookings.js';
import operatorRoutes from './routes/operators.js';
import gemsRoutes from './routes/gems.js';

const backendApp = express();

backendApp.use(express.json());

// Mount API routes
backendApp.use('/api/auth', authRoutes);
backendApp.use('/api', siteRoutes);
backendApp.use('/api', bookingRoutes);
backendApp.use('/api/operators', operatorRoutes);
backendApp.use('/api', gemsRoutes);

export default backendApp;
