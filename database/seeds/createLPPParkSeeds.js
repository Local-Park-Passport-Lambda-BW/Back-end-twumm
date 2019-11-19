/* eslint-disable implicit-arrow-linebreak */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Parks').del()
    .then(() =>
      // Inserts seed entries
      knex('Parks').insert([
        {
          id: 1,
          name: 'Recreational Park',
          city: 'Accra',
          country: 'Ghana',
        },
        {
          id: 2,
          name: 'Memory Lane Art Park',
          city: 'Accra',
          country: 'Ghana',
        },
        {
          id: 3,
          name: 'Henry Dei Recreational Center',
          city: 'Accra',
          country: 'Ghana',
        },
      ]));
};
