/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const router = require('express').Router();

const Park = require('./service');
const { restricted, userExists } = require('../user/middlewares');

router.get('/', async (req, res, next) => {
  try {
    const parks = await Park.getAllParks();
    res
      .status(200)
      .json(parks);
  } catch (error) {
    next(new Error(error));
  }
});

router.get('/characteristics', async (req, res, next) => {
  try {
    const characteristics = await Park.getAllCharacteristics();
    res
      .status(200)
      .json(characteristics);
  } catch (error) {
    next(new Error(error));
  }
});

router.get('/:parkId', restricted, async (req, res, next) => {
  const { parkId } = req.params;
  try {
    const park = await Park.getParkById(parkId);
    res
      .status(200)
      .json(park);
  } catch (error) {
    next(new Error(error));
  }
});

router.post('/add-characteristic', restricted, async (req, res, next) => {
  const { type, description } = req.body;
  const characteristic = { type, description };
  try {
    const newCharacteristic = await Park.addCharacteristic(characteristic);
    res
      .status(200)
      .json(newCharacteristic);
  } catch (error) {
    next(new Error(error));
  }
});

router.delete('/delete-characteristic/:characteristicId', restricted, async (req, res, next) => {
  const { characteristicId } = req.params;
  try {
    const deletedCharacteristic = await Park.deleteCharacteristic(characteristicId);
    res
      .status(201)
      .json(deletedCharacteristic);
  } catch (error) {
    next(new Error(error));
  }
});

router.post('/add-characteristic/:characteristicId/:parkId/park', restricted, async (req, res, next) => {
  const { characteristicId, parkId } = req.params;
  try {
    const addedCharacteristic = await Park.addCharacteristicToPark(parkId, characteristicId);
    res
      .status(200)
      .json(addedCharacteristic);
  } catch (error) {
    next(new Error(error));
  }
});

router.delete('/delete-characteristic/:characteristicId/:parkId/park', restricted, async (req, res, next) => {
  const { characteristicId, parkId } = req.params;
  try {
    const deletedCharacteristic = await Park.removeCharacteristicFromPark(parkId, characteristicId);
    res
      .status(200)
      .json(deletedCharacteristic);
  } catch (error) {
    next(new Error(error));
  }
});

router.post('/:userId', [userExists, restricted], async (req, res, next) => {
  const { name, city, country, description } = req.body;
  const { userId } = req.params;
  const park = { name, city, country, description };
  try {
    const newPark = await Park.createPark(userId, park);
    res
      .status(200)
      .json(newPark);
  } catch (error) {
    next(new Error(error));
  }
});

router.delete('/:parkId/:userId', [userExists, restricted], async (req, res, next) => {
  const { parkId } = req.params;
  try {
    const deletedPark = await Park.deletePark(parkId);
    res
      .status(200)
      .json(deletedPark);
  } catch (error) {
    next(new Error(error));
  }
});

router.put('/:parkId/:userId', [userExists, restricted], async (req, res, next) => {
  const { name, city, country, description } = req.body;
  const parkUpdate = { name, city, country, description };
  const { parkId } = req.params;
  try {
    const updatedPark = await Park.updatePark(parkId, parkUpdate);
    res
      .status(200)
      .json(updatedPark);
  } catch (error) {
    next(new Error(error));
  }
});

module.exports = router;
