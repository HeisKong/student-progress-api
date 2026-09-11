import express from 'express';
import studentRoutes from './routes/student.routes';
import summaryRoutes from './routes/summary.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ success: true, message: 'API is running' }));
app.use('/api/students', studentRoutes);
app.use('/api/summary', summaryRoutes);
app.use(errorHandler);

export default app;
