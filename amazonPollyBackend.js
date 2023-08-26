const express = require('express');
const AWS = require('aws-sdk');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON in the request body

require('dotenv').config();
// Configure AWS
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'ap-southeast-1'
});

// Route to generate and return audio
app.post('/generate-audio', async (req, res) => {
//   console.log("req.body", req.body);
  const textInput = req.body.textInput; // Get the text from the request if needed
//   console.log("textInput", textInput);
  const polly = new AWS.Polly();

  const params = {
    OutputFormat: 'mp3',
    SampleRate: '8000',
    Text: textInput,
    TextType: 'text',
    VoiceId: 'Joanna'
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    res.set('Content-Type', 'audio/mpeg');
    res.send(data.AudioStream);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating audio');
  }
});

app.get("/", (req, res)=>{
    const filePath = path.join(__dirname, 'amazonPollyUser.html');
    res.sendFile(filePath);
})

app.get('/amazonPollyUserScript.js', (req, res) => {
    const filePath = path.join(__dirname, 'amazonPollyUserScript.js');
    res.setHeader('Content-Type', 'application/javascript'); // Set the correct MIME type
    res.sendFile(filePath);
});  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
