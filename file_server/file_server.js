import fs from 'fs';
import http from 'http';

const server = http.createServer((request, response) => {
  try {
    const file = fs.readFileSync('sample-text.csv');

    // Send the response body
    response.end(file);
  } catch (err) {
    console.log('Error reading file', err.message);
  }
});

const PORT = 8848;

server.listen(PORT);

// Console will print the message
console.log(`Server running at http://127.0.0.1:${PORT}/`);

function add(a, b) {
  return a + b;
}
