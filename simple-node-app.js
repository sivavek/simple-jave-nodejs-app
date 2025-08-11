// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Health check endpoint (useful for monitoring)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Main welcome route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to My App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          background-color: #f5f5f5;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        h1 {
          color: #333;
          margin-bottom: 20px;
        }
        .info {
          color: #666;
          margin-top: 20px;
        }
        .badge {
          display: inline-block;
          background: #007bff;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          margin: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎉 Welcome to My Simple Node.js App!</h1>
        <p>This is a basic Express.js application perfect for GitHub Actions workflows.</p>
        <div class="info">
          <p><strong>Server Information:</strong></p>
          <div class="badge">Node.js</div>
          <div class="badge">Express</div>
          <div class="badge">Port: ${PORT}</div>
          <p><small>Server started at: ${new Date().toLocaleString()}</small></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// API endpoint that returns JSON
app.get('/api/info', (req, res) => {
  res.json({
    message: 'Hello from the API!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Go back to home</a>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/info`);
});

module.exports = app;