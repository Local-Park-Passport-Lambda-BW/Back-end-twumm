const router = require('express').Router();

const User = require('./service');
const {
  hashPassword,
  generateJwtToken,
  reversePasswordHash,
  validateUserData,
} = require('./middlewares');

router.post('/signup', [validateUserData, hashPassword], async (req, res, next) => {
  const { email, username } = req.body;
  const { hashedPassword } = req;
  const user = {
    email,
    password: hashedPassword,
    username,
  };

  try {
    const newUser = await User.createUser(user);
    res
      .status(200)
      .json(newUser);
  } catch (error) {
    next(new Error('User could not be signed up. Please try again again'));
  }
});
