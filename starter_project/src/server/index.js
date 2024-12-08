var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'));
// app.use(express.static('src'));
// app.use(express.static(path.resolve(__dirname, 'dist')));

console.log(__dirname);

// Variables for url and api key
const MEAN_CLOUD_URL = 'https://api.meaningcloud.com/sentiment-2.1?'; 
const API_KEY = process.env.API_KEY;

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
  // res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    // res.sendFile(path.resolve('src/client/views/index.html'))
});

// POST Route

app.post('/api', async (req, res) => {
  try {
    // 1. GET the URL from the request body
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // 2. Build the API URL
    const apiUrl = `${MEAN_CLOUD_URL}?key=${API_KEY}&url=${encodeURIComponent(url)}&lang=en`;

    // 3. Fetch data from the external API
    const apiResponse = await fetch(apiUrl);
    if (!apiResponse.ok) {
      throw new Error(`Error fetching data from API: ${apiResponse.statusText}`);
    }
    const apiData = await apiResponse.json();

    // 4. Extract required data and send it to the client
    const sample = {
      text: apiData.sentence_list[0].text || '',
      score_tag: apiData.score_tag || '',
      agreement: apiData.agreement || '',
      subjectivity: apiData.subjectivity || '',
      confidence: apiData.confidence || '',
      irony: apiData.irony || '',
    };
    res.status(200).json(sample);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


module.exports = { app }

