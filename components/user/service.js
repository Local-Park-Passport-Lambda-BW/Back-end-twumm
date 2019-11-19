/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
const db = require('../../database/config');

const getUserById = id => {
  return db('Users')
    .where({ id })
    .first();
};

const findUserBy = filter => {
  return db('Users')
    .where(filter);
};

const createUser = user => {
  return db('Users')
    .insert(user)
    .then(ids => getUserById(ids[0]));
};

const updateUser = (id, changes) => {
  return db('Users')
    .where({ id })
    .update(changes);
};

const deleteUser = id => {
  return db('Users')
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
