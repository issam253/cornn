const axios = require('axios');
const express = require('express');
const app = express();


async function fetchVideoURLs(userQuery) {
    const apiUrl = `https://tools.betabotz.eu.org/tools/xvideosearch?q=${userQuery}`;

    const response = await axios.get(apiUrl);
    const { result } = response.data;

   
    const urls = result.map(video => video.url);
    return urls;
}


app.get('/kshitiz', async (req, res) => {
    try {
        const userQuery = req.query.q;

        if (userQuery) {
           
            const videoURLs = await fetchVideoURLs(userQuery);
            return res.json({ urls: videoURLs });
        } else {
           
            return res.status(400).json({ error: 'Query parameter "q" is required' });
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
