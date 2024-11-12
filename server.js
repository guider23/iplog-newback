const express = require('express');
const fs = require('fs');
const requestIp = require('request-ip');  // Import request-ip
const app = express();
const PORT = process.env.PORT || 3000;  // Use the port provided by Render

app.use(requestIp.mw());  // Middleware to automatically detect IPs

app.get('/', (req, res) => {
    const ip = req.clientIp;  // Retrieve the client's IP address
    const timestamp = new Date().getTime();  // Current timestamp
    const logEntry = `${timestamp},${ip}\n`;  // Comma-separated timestamp and IP

    console.log('Captured IP:', ip);  // Debug: Print IP to console

    // Append the log entry to 'logs.csv'
    fs.appendFile('logs.csv', logEntry, (err) => {
        if (err) {
            console.error('Error logging request:', err.message);
            res.status(500).send(`Error logging request: ${err.message}`);
        } else {
            res.send('Request logged!');
        }
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
