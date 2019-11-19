/* eslint-disable implicit-arrow-linebreak */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Ratings').del()
    .then(() =>
      // Inserts seed entries
      knex('Ratings').insert([
        {
          id: 1,
          rating: 3,
          park_id: 1,
          user_id: 1,
        },
        {
          id: 2,
          rating: 3,
          park_id: 1,
          user_id: 2,
        },
        {
          id: 3,
          rating: 4,
          park_id: 1,
          user_id: 3,
        },
        {
          id: 4,
          rating: 4,
          park_id: 1,
          user_id: 4,
        },
        {
          id: 5,
          rating: 4,
          park_id: 2,
          user_id: 1,
        },
        {
          id: 6,
          rating: 5,
          park_id: 2,
          user_id: 2,
        },
        {
          id: 7,
          rating: 2,
          park_id: 2,
          user_id: 4,
        },
      ]));
};
