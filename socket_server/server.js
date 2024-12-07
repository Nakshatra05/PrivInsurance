import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';  // Import CORS package

const app = express();
const PORT = 3000;

// Use CORS middleware to allow cross-origin requests
app.use(cors({
  origin: 'http://localhost:5173',  // Allow your frontend URL
  methods: ['GET', 'POST'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'],  // Allow specific headers
}));

// Create an HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Initialize Socket.IO server with CORS options
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',  // Allow connection from your frontend
    methods: ['GET', 'POST'],  // Allow specific methods
    allowedHeaders: ['Content-Type'],  // Allow specific headers
  },
});

// Listen for incoming WebSocket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for insurance data submission
  socket.on('submitInsuranceData', (data) => {
    console.log('Received insurance data:', data);

    // Simulate processing and respond back with an insurance recommendation
    const insuranceRecommendation = {
      status: 'success',
      recommendation: `Recommended insurance based on your data: ${JSON.stringify(data)}`,
    };

    // Send the response back to the client
    socket.emit('insuranceResponse', insuranceRecommendation);
  });

  // Listen for user data submission
  socket.on('submitUserData', (data) => {
    console.log('Received user data:', data);

    // Simulate processing and respond back with a user insurance recommendation
    const userRecommendation = {
      status: 'success',
      recommendation: `Insurance recommendation for user based on your data: ${JSON.stringify(data)}`,
    };

    // Send the response back to the client
    socket.emit('userResponse', userRecommendation);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
