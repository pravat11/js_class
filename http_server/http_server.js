import http from 'http';

const server = http.createServer((request, response) => {
  // Send the response body
  response.end('This is my first http server in NodeJS\n');
});

const PORT = 8848;

server.listen(PORT);

// Console will print the message
console.log(`Server running at http://127.0.0.1:${PORT}/`);
