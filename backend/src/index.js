import express from 'express';
import cors from 'cors';
import salesRoutes from './routes/sales.js';
import { corsOptions } from './utils/corsConfig.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/sales', salesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
