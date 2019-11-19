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

const reversePassword = async (req, res, next) => {
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
