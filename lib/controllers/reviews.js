const { Router } = require('express');
const Review = require('../models/Review');
// const authenticate = require('../middleware/authenticate');

module.exports = Router()

  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Review.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  
;
