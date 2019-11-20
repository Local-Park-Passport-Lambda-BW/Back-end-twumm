const router = require('express').Router();

const Rating = require('./service');

router.post('/rating/:parkId/:userId', async (req, res, next) => {
  const { rating, comment } = req.body;
  const { parkId, userId } = req.params;
  const ratings = { rating, comment };
  try {
    const newRating = await Rating.ratePark(parkId, userId, ratings);
    res
      .status(200)
      .json(newRating);
  } catch (error) {
    next(new Error(error));
  }
});

router.put('/rating/:ratingId', async (req, res, next) => {
  const { rating, comment } = req.body;
  const { ratingId } = req.params;
  const ratingUpdate = { rating, comment };
  try {
    const updatedRating = await Rating.updateParkRating(ratingId, ratingUpdate);
    res
      .status(200)
      .json(updatedRating);
  } catch (error) {
    next(new Error(error));
  }
});

module.exports = router;
