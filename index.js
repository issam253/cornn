const axios = require('axios');
const express = require('express');
const app = express();


async function fetchXNXXURL(urlXNXX) {
    const options = {
        method: 'POST',
        url: 'https://all-media-downloader1.p.rapidapi.com/xnxx',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '719775e815msh65471c929a0203bp10fe44jsndcb70c04bc42',
            'X-RapidAPI-Host': 'all-media-downloader1.p.rapidapi.com'
        },
        data: {
            urlXNXX: urlXNXX
        }
    };

    const response = await axios.request(options);
    const { result } = response.data;
    if (result && result.url) {
        return result.url;
    } else {
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
