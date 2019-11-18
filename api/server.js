const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', async (req, res, next) => {
  try {
    res
      .status(200)
      .json({
        message: 'Welcome to the LPP - Local Park Passport!'
      });
  } catch (error) {
    next(new Error('Local Park Passport is not available at the moment'));
  }
});

module.exports = server;