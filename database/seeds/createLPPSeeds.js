/* eslint-disable implicit-arrow-linebreak */
const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hashSync(plainPassword, 12);
  return hashedPassword;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(() =>
      // Inserts seed entries
      knex('Users').insert([
        {
          id: 1,
          name: 'user one',
          email: 'user1@test.com',
          username: 'user1',
          password: '$2b$12$Rom84jFWDdalPVmmck81uefAkRVx3Em1kqoimfCB1GU6gWH3wge.m',
        },
        {
          id: 2,
          name: 'user two',
          email: 'user2@test.com',
          username: 'user2',
          password: '$2b$12$Rom84jFWDdalPVmmck81uefAkRVx3Em1kqoimfCB1GU6gWH3wge.m',
        },
        {
          id: 3,
          name: 'user three',
          email: 'user3@test.com',
          username: 'user3',
          password: '$2b$12$Rom84jFWDdalPVmmck81uefAkRVx3Em1kqoimfCB1GU6gWH3wge.m',
        },
        {
          id: 4,
          name: 'user four',
          email: 'user4@test.com',
          username: 'user4',
          password: '$2b$12$Rom84jFWDdalPVmmck81uefAkRVx3Em1kqoimfCB1GU6gWH3wge.m',
        },
      ]));
};
