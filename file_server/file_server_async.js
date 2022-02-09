import http from 'http';
import fs from 'fs';

http
  .createServer((request, response) => {
    console.log('Received request from client:', request.url);

    const file = fs.readFile('sample-text.csv', (err, data) => {
      if (err) {
        console.log('An error occurred.', err);

        response.end(data.toString());
      }
      // Send the response body
      response.end(data.toString());
    });
  })
  .listen(1234);

// Console will print the message
console.log('Server running at http://127.0.0.1:1234/');
