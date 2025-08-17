import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { functions, serve, inngest } from './inngest/index.js';
const app = express();
const port = process.env.PORT || 3000;
await connectDB();
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
  res.send('Movie Ticket Booking API is Live!');
});
app.use('/api/inngest', serve({ client: inngest, functions }));

// Check that all components exist before using them
// For local development
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


// Export the Express API for Vercel serverless deployment
export default app;