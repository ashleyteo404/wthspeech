module.exports = (req, res) => {
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
  };
  