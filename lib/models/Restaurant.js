const pool = require('../utils/pool');

class Restaurant {
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

  static async getAll() {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM restaurants
    `, 
    );
    return rows.map((row) => new Restaurant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
        restaurants.*, 
        COALESCE(
          json_agg(to_jsonb(reviews))
          FILTER (WHERE reviews.id IS NOT NULL), '[]'
      ) as reviews FROM restaurants 
        LEFT JOIN reviews on restaurants.id = reviews.restaurants.id 
        WHERE reviews.id = $1
        GROUP BY reviews.id`,
      [id]
    );
    console.log(rows[0]);
    return new Restaurant(rows[0]);
  }

  static async insert({ rating, opinion }) {
    const { rows } = await pool.query(
      'INSERT INTO restaurants (rating, opinion) VALUES ($1, $2) returning*;',
      [rating, opinion]
    );
    console.log(rows[0]);
    return new Restaurant(rows[0]);
  }
}

module.exports = Restaurant;
