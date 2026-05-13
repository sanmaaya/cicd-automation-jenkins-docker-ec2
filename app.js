const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Simple API endpoint
app.get('/api', (req, res) => {
    res.json({ 
        message: 'Skyward Aviation API is running smoothly.',
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

// Fallback to serving the index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Application running on port ${port}`);
});
