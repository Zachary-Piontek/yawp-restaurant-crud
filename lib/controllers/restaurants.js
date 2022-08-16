const { Router } = require('express');
const Restaurant = require('../models/Restaurant');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.send(restaurants);
    } catch (error) {
      next(error);
    }
  })


;
