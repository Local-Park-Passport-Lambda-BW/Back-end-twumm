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

const reversePasswordHash = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    User.findUserBy({ email })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.user = user;
          next();
        } else {
          res
            .status(401)
            .json({
              message: 'Invalid credentials',
            });
        }
      });
  } catch (error) {
    next(new Error('Something went wrong on the sign-in attempt'));
  }
};

const generateJwtToken = user => {
  const payload = {
    sub: user.id,
  };

  const options = {
    expiresIn: '1d',
  };

  const token = jwt.sign(payload, jwtSecret, options);
  return token;
};

const restricted = (req, res, next) => {
  const tokenInAuthHeader = req.headers.authorization;

  if (tokenInAuthHeader) {
    jwt.verify(tokenInAuthHeader, jwtSecret, (error, decodedToken) => {
      if (error) {
        res
          .status(401)
          .json({
            message: 'User is not authorized',
          });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    next(new Error('No credentials'));
  }
};

const validateUserData = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length <= 0) {
    res
      .status(400)
      .json({ message: 'User data is missing' });
  } else if (!req.body.email || !req.body.password) {
    res
      .status(400)
      .json({ message: 'Missing required *email* and *password* fields' });
  } else {
    next();
  }
};

const userExists = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.getUserById(userId);
    req.user = user;
    next();
  } catch (error) {
    next(new Error('User does not exist.'));
  }
};

module.exports = {
  hashPassword,
  reversePasswordHash,
  generateJwtToken,
  restricted,
  validateUserData,
  userExists,
};
