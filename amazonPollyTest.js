const AWS = require('aws-sdk');
const play = require('play-sound')();

AWS.config.update({
    accessKeyId: 'AKIAZTS6EGSGHWRN53FP',
    secretAccessKey: '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',
    region: 'ap-southeast-1'
});  

AWS.config.apiVersions = {
  polly: '2016-06-10',
  // other service API versions
};

var polly = new AWS.Polly();

var params = {
// LexiconNames: [
//     "example"
// ], 
OutputFormat: "mp3", 
SampleRate: "8000", 
Text: "All Gaul is divided into three parts", 
TextType: "text", 
VoiceId: "Joanna"
};

polly.synthesizeSpeech(params, function(err, data) {
  if (err) {
    console.error(err, err.stack);
  } else {
    const audioData = data.AudioStream;
    const buffer = Buffer.from(audioData);

    // Play the audio using play-sound
    play.play(buffer);
  }
    // if (err) console.log(err, err.stack); // an error occurred
    // else     console.log(data);           // successful response
    /*
    data = {
    AudioStream: <Binary String>, 
    ContentType: "audio/mpeg", 
    RequestCharacters: 37
    }
    */
});

// var params = {
// };
// polly.listLexicons(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
// });

// var params = {
// //   Engine: standard | neural,
// //   IncludeAdditionalLanguageCodes: true || false,
// //   LanguageCode: arb | cmn-CN | cy-GB | da-DK | de-DE | en-AU | en-GB | en-GB-WLS | en-IN | en-US | es-ES | es-MX | es-US | fr-CA | fr-FR | is-IS | it-IT | ja-JP | hi-IN | ko-KR | nb-NO | nl-NL | pl-PL | pt-BR | pt-PT | ro-RO | ru-RU | sv-SE | tr-TR | en-NZ | en-ZA | ca-ES | de-AT | yue-CN | ar-AE | fi-FI | en-IE | nl-BE | fr-BE,
// //   NextToken: 'STRING_VALUE'
//     LanguageCode: "en-GB"
// };

// polly.describeVoices(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });