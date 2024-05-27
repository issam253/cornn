const axios = require('axios');
const express = require('express');
const app = express();

async function fetchXNXXURL(urlXNXX) {
    const apiUrl = `https://tools.betabotz.eu.org/tools/xnxxdl?url=${encodeURIComponent(urlXNXX)}`;

    try { 
        const response = await axios.get(apiUrl);
        const { result } = response.data;
        if (result && result.url) {
            return result.url;
        } else {
            throw new Error('Failed to fetch XNXX URL');
        }
    } catch (error) {
        throw new Error('Failed to fetch XNXX URL');
    }
}

app.get('/kshitiz', async (req, res) => {
    try {
        const urlXNXX = req.query.url;
        if (urlXNXX) {
            const xnxxURL = await fetchXNXXURL(urlXNXX);
            return res.json({ xnxxURL });
        } else {
            return res.status(400).json({ error: 'Query parameter "url" is required' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
