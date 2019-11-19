const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./service');
const { jwtSecret } = require('../../config/jwt_secret');

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hashSync(password, 12);
    req.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    next(new Error('Something went wrong. Please try again'));
  }
};
