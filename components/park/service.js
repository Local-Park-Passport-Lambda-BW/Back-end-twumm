/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
const db = require('../../database/config');

const getAllParks = () => {
  return db('Parks');
};

module.exports = {
  getAllParks,
};
