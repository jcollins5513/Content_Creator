import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mediaRoutes from './routes/api/media';
import calendarRoutes from './routes/api/calendar';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/api/media', mediaRoutes);
app.use('/api/calendar', calendarRoutes);

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
