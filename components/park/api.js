/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const router = require('express').Router();

const Park = require('./service');

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

router.post('/:user_id', async (req, res, next) => {
  const { name, city, country, description } = req.body;
  const { user_id } = req.params;
  const park = { name, city, country, description };
  try {
    const newPark = await Park.createPark(user_id, park);
    res
      .status(200)
      .json(newPark);
  } catch (error) {
    next(new Error(error));
  }
});

router.delete('/:parkId/:userId', async (req, res, next) => {
  const { parkId, userId } = req.params;
  try {
    const deletedPark = await Park.deletePark(parkId);
    res
      .status(200)
      .json(deletedPark);
  } catch (error) {
    next(new Error(error));
  }
});

router.put('/:parkId/:userId', async (req, res, next) => {
  const { name, city, country, description } = req.body;
  const parkUpdate = { name, city, country, description };
  const { parkId, userId } = req.params;
  try {
    const updatedPark = await Park.updatePark(parkId, parkUpdate);
    res
      .status(200)
      .json(updatedPark);
  } catch (error) {
    next(new Error(error));
  }
});

router.post('/add-characteristic/', async (req, res, next) => {
  const { characteristic } = req.body;
  try {
    const newCharacteristic = await Park.addCharacteristic(characteristic);
    res
      .status(200)
      .json(newCharacteristic);
  } catch (error) {
    next(new Error(error));
  }
});

router.delete('/delete-characteristic/:characteristicId', async (req, res, next) => {
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

router.post('/add-characteristic/:characteristicId/:parkId/park', async (req, res, next) => {
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

router.delete('/delete-characteristic/:characteristicId/:parkId/park', async (req, res, next) => {
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

module.exports = router;
