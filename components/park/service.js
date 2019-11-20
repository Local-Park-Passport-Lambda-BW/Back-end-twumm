/* eslint-disable camelcase */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
const db = require('../../database/config');

const getAllParks = () => {
  return db('Parks');
};

const getParkById = id => {
  return db('Parks')
    .where({ id })
    .first();
};

const createPark = (user_id, park) => {
  return db('Parks')
    .insert({
      user_id,
      name: park.name,
      city: park.city,
      country: park.country,
      description: park.description,
    })
    .returning('id')
    .then(ids => getParkById(ids[0]));
};

const updatePark = (id, changes) => {
  return db('Parks')
    .where({ id })
    .update(changes);
};

const deletePark = id => {
  return db('Parks')
    .where({ id })
    .del();
};

module.exports = {
  getAllParks,
  getParkById,
  createPark,
  updatePark,
  deletePark,
};
