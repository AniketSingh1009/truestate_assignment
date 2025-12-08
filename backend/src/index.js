import express from 'express';
import cors from 'cors';
import salesRoutes from './routes/sales.js';
import { corsOptions } from './utils/corsConfig.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Retail Sales API is running' });
});

app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'API endpoint is working' });
});

app.use('/api/sales', salesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API available at http://localhost:${PORT}/api`);
});
