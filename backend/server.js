import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resume.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '10mb' }));

app.get('/', (_req, res) => {
  res.json({ message: 'ATS Resume Builder API is running ✅' });
});

app.use('/api/resume', resumeRoutes);

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
