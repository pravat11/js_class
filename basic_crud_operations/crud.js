import os from 'os';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import serveFavicon from 'serve-favicon';

const server = express();

server.use(serveFavicon('./public/favicon.ico'));

const logger = winston.createLogger({
  level: 'info',
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

server.use(helmet());
server.use(morgan('common'));
server.use(bodyParser.json());

server.get('/', (req, res, next) => {
  res.send('This is the response from the index(/) route');
});

server.get('/cars', (req, res, next) => {
  logger.info('Fetching all cars');

  fs.readFile('./data.txt', (err, data) => {
    if (err) {
      logger.error(`Error reading from file: ${err.message}`);

      res.status(400).json({
        message: `Error reading from file`,
      });

      return;
    }

    const str = data
      .toString()
      .split('\n')
      .filter((a) => !!a)
      .map((row) => JSON.parse(row));

    res.json({
      message: 'List of cars',
      data: str,
    });
  });
});

server.post('/cars', (req, res, next) => {
  logger.debug('Payload received', req.body);

  const body = JSON.stringify(req.body) + os.EOL;

  logger.info('Checking file existence');
  const hasFile = fs.existsSync('./data.txt');

  if (!hasFile) {
    logger.error(`Cannot find file: data.txt`);

    res.status(404).json({
      message: `Cannot find file: data.txt`,
    });

    return;
  }

  logger.info('File existence verified. Now writing to file');

  fs.appendFile('./data.txt', body, (err) => {
    if (err) {
      logger.error(`Error writing to file: ${err.message}`);

      res.status(400).json({
        message: `Error writing to file: ${err.message}`,
      });
    }

    logger.info('Successfully written to file');

    res.json({
      message: 'Added record successfully',
      data: req.body,
    });
  });
});

const PORT = 8848;

server.listen(PORT, () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});

// INFO -> For information purpose. For example "Fetching record for car id 1", "Getting all information on cars", "Validation on the request successful"
// ERROR -> For errors. For example "Could not find any car associated with id 1", "The requested resource could not be found", "Invalid data"
// DEBUG -> For developer debugging purpose. It might show actual data or objects "Received request payload: { "firstName": "Prabhat", "lastName": "Gautam" }"

// Validation -> Check if exists -> Update -> Sucessful

// INFO: Starting the validation process

// ERROR: Validation failed. firstName should be a string and not a number

// DEBUG: Payload received: { "firstName": "Prabhat", "lastName": "Gautam" }

// INFO: Validation sucessful. Now checking if the data exists

// ERROR: Cannot find the associated data.

// INFO: Data existence verfified. Updating the data.

// DEBUG: Updated data: { "firstName": "Prabhat", "lastName": "Gautam", "address": "Lalitpur" }

// INFO: Successfully updated the data
