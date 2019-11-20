/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const router = require('express').Router();

const Park = require('./service');

router.get('/', async (req, res, next) => {
  try {
    const parks = await Park.getAllParks();
    res
      .status(200)
      .json(parks);
  } catch (error) {
    next(new Error(error));
  }
});

router.post('/:user_id', async (req, res, next) => {
  const { name, city, country, description } = req.body;
  const { user_id } = req.params;
  const park = { name, city, country, description };
  try {
    const newPark = await Park.createPark(user_id, park);
    res
      .status(200)
      .json(newPark);
  } catch (error) {
    next(new Error(error));
  }
});

module.exports = router;
