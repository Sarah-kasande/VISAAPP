const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001; // Port for the backend server

app.use(express.json());
app.use(cors());

// Read the visa data from the JSON file asynchronously
fs.readFile('visaData.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the JSON file", err);
        return;
    }

    const visaData = JSON.parse(data);

    // Endpoint to get all country names
    app.get('/countries', (req, res) => {
        res.json(Object.keys(visaData));
    });

    // Endpoint to get visa info by country (case-insensitive)
    app.get('/visa-info', (req, res) => {
        const country = req.query.country;

        const matchedCountry = Object.keys(visaData).find(
            key => key.toLowerCase() === country.toLowerCase()
        );

        if (matchedCountry) {
            res.json(visaData[matchedCountry]);
        } else {
            res.status(404).json({ message: 'Country not found' });
        }
    });

    // Endpoint to get all visa info
    app.get('/all-visa-info', (req, res) => {
        res.json(visaData);
    });

    // Start the server after loading the data
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
