const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'ap-southeast-1'
});

module.exports = async (req, res) => {
  const { textInput } = req.body;

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
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(data.AudioStream);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating audio');
  }
};
