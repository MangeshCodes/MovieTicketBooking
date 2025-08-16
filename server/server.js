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

// Debugging endpoint for Inngest
app.post('/debug/clerk-event', async (req, res) => {
  try {
    console.log('Received debug event:', JSON.stringify(req.body, null, 2));
    
    // Manually trigger an Inngest event for testing
    const eventType = req.body.type || 'clerk/user.created';
    
    await inngest.send({
      name: eventType,
      data: req.body.data || {
        id: 'test-id-' + Date.now(),
        first_name: 'Test',
        last_name: 'User',
        email_addresses: [{ email_address: 'test@example.com' }],
        image_url: 'https://via.placeholder.com/150'
      }
    });
    
    res.json({ success: true, message: `Debug ${eventType} event sent to Inngest` });
  } catch (error) {
    console.error('Error sending debug event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending event',
      error: error.message
    });
  }
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