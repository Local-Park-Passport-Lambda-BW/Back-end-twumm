/* eslint-disable arrow-body-style */
const db = require('../../database/config');

const ratePark = (parkId, userId, ratings) => {
  return db('Ratings')
    .insert({
      rating: ratings.rating,
      comment: ratings.comment,
      park_id: parkId,
      user_id: userId,
    })
    .returning('id');
};

const updateParkRating = (id, ratings) => {
  return db('Ratings')
    .where({ id })
    .update(ratings);
};

module.exports = {
  ratePark,
  updateParkRating,
};
