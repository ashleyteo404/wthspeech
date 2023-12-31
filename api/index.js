const microCors = require('micro-cors'); // Import micro-cors package

// const cors = microCors(); // Initialize cors
const cors = microCors({
    allowMethods: ['GET', 'POST'], // Allow GET and POST requests
    origin: '*' // Allow requests from any origin
  });


module.exports = cors((req, res) => {
    const { method, url } = req;
  
    if (method === 'GET' && url === '/') {
      const filePath = require('path').join(__dirname, 'amazonPollyUser.html');
      return require('fs').readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
          res.status(500).send('Error reading HTML file');
        } else {
          res.setHeader('Content-Type', 'text/html');
          res.send(content);
        }
      });
    }
  
    if (method === 'GET' && url === '/amazonPollyUserScript.js') {
      const filePath = require('path').join(__dirname, 'amazonPollyUserScript.js');
      return require('fs').readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
          res.status(500).send('Error reading JavaScript file');
        } else {
          res.setHeader('Content-Type', 'application/javascript');
          res.send(content);
        }
      });
    }
  
    res.status(404).send('Not Found');
  });
  