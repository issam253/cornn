const axios = require('axios');
const express = require('express');
const app = express();

async function fetchXNXXURL(urlxn) {
    const apiUrl = `https://tools.betabotz.eu.org/tools/xnxxdl?url=${encodeURIComponent(urlxn)}`;

    try { 
        const response = await axios.get(apiUrl);
        const { result } = response.data;
        if (result && result.url) {
            return result.url;
        } else {
            throw new Error('ادخل رابط مححح');
        }
    } catch (error) {
        throw new Error('ادخل رابط مححح');
    }
}

app.get('/dlxn', async (req, res) => {
    try {
        const urlxn = req.query.url;
        if (urlxn) {
            const xnxxURL = await fetchXNXXURL(urlxn);
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
