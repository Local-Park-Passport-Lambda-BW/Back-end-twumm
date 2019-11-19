const router = require('express').Router();

const User = require('./service');
const {
  hashPassword,
  generateJwtToken,
  reversePasswordHash,
  validateUserData,
} = require('./middlewares');

router.post('/register', [validateUserData, hashPassword], async (req, res, next) => {
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


router.post('/login', [validateUserData, reversePasswordHash], async (req, res, next) => {
  try {
    if (req.user) {
      const token = await generateJwtToken(req.user);
      res
        .status(200)
        .json({
          id: req.user.id,
          email: req.user.email,
          token,
        });
    } else {
      next(new Error('User is not authorized'));
    }
  } catch (error) {
    next(new Error('Signin failed!'));
  }
});

module.exports = router;
