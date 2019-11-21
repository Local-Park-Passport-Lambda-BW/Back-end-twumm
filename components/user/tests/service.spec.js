const db = require('../../../database/config');
const User = require('../service');

const testUser = {
  email: 'some4@test.com',
  username: 'sometest4',
  password: '12345678',
  name: 'some user',
};

describe('User model', () => {
  beforeEach(async () => {
    await db('Users').truncate();
  });

  describe('inserts a user in the database', () => {
    it('inserts a new user into the database', async () => {
      const newUser = await User.createUser(testUser);
      expect(newUser.id).toBe(1);
    });
  });

  describe('inserts a user in the database', () => {
    it('inserts a new user into the database', async () => {
      const newUser = await User.createUser(testUser);
      const userInDB = await User.getUserById(newUser.id);
      expect(userInDB.email).toBe(testUser.email);
    });
  });

  describe('find user by email or username', () => {
    it('finds user by email from the database', async () => {
      const newUser = await User.createUser(testUser);
      const userWithEmail = await User.findUserBy(newUser.email);
      const userWithUsername = await User.findUserBy(newUser.username);
      expect(userWithEmail.length).toBe(1);
      expect(userWithUsername.length).toBe(1);
    });
  });

  describe('delete user', () => {
    it('delete user from database', async () => {
      const newUser = await User.createUser(testUser);
      const deletedUser = await User.findUserBy(newUser.email);
      console.log(deletedUser);
    });
  });
});
