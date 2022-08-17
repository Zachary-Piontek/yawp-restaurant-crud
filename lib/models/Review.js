const pool = require('../utils/pool');

class Review {
  id;
  name;
  service;
  food;
  rating;
  opinion;
  reviews;


  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.service = row.service;
    this.food = row.food;
    this.rating = row.rating;
    this.opinion = row.opinion;
    this.reviews = row.reviews;
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from reviews
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Review(rows[0]);
  }
  
}

module.exports = Review;
