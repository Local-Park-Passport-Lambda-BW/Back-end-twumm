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

const getAllCharacteristics = () => {
  return db('Characteristics');
};

const addCharacteristic = characteristic => {
  return db('Characteristics')
    .insert(characteristic)
    .returning('id');
};

const deleteCharacteristic = characteristicId => {
  return db('Characteristics')
    .where({ id: characteristicId })
    .del();
};

const addCharacteristicToPark = (parkId, characteristicsId) => {
  return db('ParkCharacteristics')
    .insert({
      park_id: parkId,
      characteristics_id: characteristicsId,
    })
    .returning('id');
};

const removeCharacteristicFromPark = (parkId, characteristicsId) => {
  return db('ParkCharacteristics')
    .where({ park_id: parkId, characteristics_id: characteristicsId })
    .del();
};

module.exports = {
  getAllParks,
  getParkById,
  createPark,
  updatePark,
  deletePark,
  getAllCharacteristics,
  addCharacteristic,
  deleteCharacteristic,
  addCharacteristicToPark,
  removeCharacteristicFromPark,
};
