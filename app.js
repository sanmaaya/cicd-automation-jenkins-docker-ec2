const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Simple API endpoint
app.get('/api', (req, res) => {
    res.json({ 
        message: 'Hello from Node.js Express App deployed via Jenkins & Docker on AWS EC2!',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint used by Docker/Jenkins validation
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString() 
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the CI/CD Automated Web App</h1><p>Navigate to <a href="/api">/api</a> or <a href="/health">/health</a></p>');
});

app.listen(port, () => {
    console.log(`Application running on port ${port}`);
});
