const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_KEY = process.env.API_KEY;

console.log('API_KEY:', API_KEY);

const BASE_URL_GIPHY = 'api.giphy.com/v1/gifs/search'

router.post('/search', (req, res) => {
    const { searchTerm } = req.body;
    //what to do??
    axios
    .get(`https://${BASE_URL_GIPHY}/?api_key=${API_KEY}&q=${searchTerm}&limit=10`)
    .then((giphyResponse) => {
        console.log('SUCCESS,',giphyResponse.data);
        const imageResults = giphyResponse.data.data.map((imageData) => {
            return {
                id: imageData.id,
                alt: imageData.title,
                image: imageData.images.original.url,

            };
        });
        res.send(imageResults);
    })
    .catch((error) => {
        console.log('ERROR:', error)
        res.sendStatus(500);
    });
})

module.exports = router;