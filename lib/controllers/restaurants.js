const { Router } = require('express');
const Restaurant = require('../models/Restaurant');

module.exports = Router()

  .get('/:id', async (req, res, next) => {
    try {
      const restaurantsId = await Restaurant.getById(req.params.id);
      res.send(restaurantsId);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.send(restaurants);
    } catch (error) {
      next(error);
    }
  })


;
