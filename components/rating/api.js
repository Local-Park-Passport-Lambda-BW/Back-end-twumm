const router = require('express').Router();

const Rating = require('./service');

router.post('/:parkId/:userId', async (req, res, next) => {
  const { rating, comment } = req.body;
  const { parkId, userId } = req.params;
  const ratings = { rating, comment };
  try {
    const newRating = await Rating.ratePark(parkId, userId, ratings)
    res
      .status(200)
      .json(newRating);
  } catch (error) {
    next(new Error(error));
  }
});

router.put('/:ratingId', async (req, res, next) => {

});

module.exports = router;
