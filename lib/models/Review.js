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
      DELETE from restaurant_reviews
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Review(rows[0]);
  }

  // static async insert({ rating, opinion }) {
  //   const { rows } = await pool.query(
  //     'INSERT INTO reviews (rating, opinion) VALUES ($1, $2) returning*;',
  //     [rating, opinion]
  //   );
  //   console.log(rows[0]);
  //   return new Review(rows[0]);
  // }
  
}

module.exports = Review;
