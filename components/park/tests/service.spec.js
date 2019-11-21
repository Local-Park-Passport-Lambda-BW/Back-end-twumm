const db = require('../../../database/config');
const Park = require('../service');
const User = require('../../user/service');

const park = {
  name: 'On some park',
  city: 'Amasu',
  country: 'Ghana',
  description: 'An awesome park in the Bono Region of Ghana'
};

const testUser = {
  email: 'some4@test.com',
  username: 'sometest4',
  password: '12345678',
  name: 'some user',
};

describe('Park model', () => {
  beforeEach(async () => {
    await db('Parks').truncate();
    await db('Users').truncate();
    await User.createUser(testUser);
  });

  describe('insert park', () => {
    it('inserts a new park into the database', async () => {
      const userInDB = await User.findUserBy(testUser.email);
      const parkInDB = await Park.createPark(userInDB[0].id, park);
      expect(parkInDB.city).toBe(park.city);
    });
  });
});
