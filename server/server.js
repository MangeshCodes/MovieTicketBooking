import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { functions, serve, inngest } from './inngest/index.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB database
connectDB()
  .then(() => {
    console.log('Database connection initialized');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Movie Ticket Booking API is Live!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is healthy!' });
});

// Check that all components exist before using them
if (serve && inngest && functions) {
  app.use('/api/inngest', serve({client: inngest, functions}));
} else {
  console.error('Inngest setup is incomplete - missing components');
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

// Export the Express API for Vercel serverless deployment
export default app;