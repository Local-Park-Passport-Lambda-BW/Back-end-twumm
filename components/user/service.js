/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
const db = require('../../database/config');

const getUserById = id => {
  return db('users')
    .where({ id })
    .first();
};

const findUserBy = filter => {
  return db('users')
    .where(filter);
};

const createUser = user => {
  return db('users')
    .insert(user)
    .then(ids => getUserById(ids[0]));
};

const updateUser = (id, changes) => {
  return db('users')
    .where({ id })
    .update(changes);
};

const deleteUser = id => {
  return db('users')
    .where({ id })
    .del();
};

module.exports = {
  getUserById,
  findUserBy,
  createUser,
  updateUser,
  deleteUser,
};
