const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const Restaurant = require('../models/Restaurant');
// const authenticate = require('../middleware/authenticate');

module.exports = Router()

  .get('/:id', async (req, res, next) => {
    try {
      const restaurantsId = await Restaurant.getById(req.params.id);
      res.send(restaurantsId);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.send(restaurants);
    } catch (e) {
      next(e);
    }
  })

  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      const createPost = await Restaurant.insert(req.body);
      res.json(createPost);
    } catch (e) {
      next (e);
    }

  });
