const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger);

server.use('/users', require('../components/user/api'));
server.use('/parks', require('../components/park/api'));

server.get('/', async (req, res, next) => {
  try {
    res
      .status(200)
      .json({
        message: 'Welcome to the LPP - Local Park Passport!',
      });
  } catch (error) {
    next(new Error('Local Park Passport is not available at the moment'));
  }
});

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} request from ${req.url}`);
  next();
}

function errorHandler(error, req, res, next) {
  console.log('ERROR: ', error);
  res
    .status(500)
    .json({
      message: error.message,
      stack: error.stack,
    });
  next();
}

server.use(errorHandler);

module.exports = server;
