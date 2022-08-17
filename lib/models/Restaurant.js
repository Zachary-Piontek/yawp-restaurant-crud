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
      LEFT JOIN restaurant_reviews on restaurants.id = restaurant_reviews.restaurant_id 
      LEFT JOIN reviews on restaurant_reviews.review_id = reviews.id
        WHERE restaurants.id = $1
        GROUP BY restaurants.id`,
      [id]
    );
    console.log(rows[0]);
    return new Restaurant(rows[0]);
  }

  static async insert({ rating, opinion }) {
    const { rows } = await pool.query(
      'INSERT INTO reviews (rating, opinion) VALUES ($1, $2) returning*;',
      [rating, opinion]
    );
    console.log(rows[0]);
    return new Restaurant(rows[0]);
  }
  
}

module.exports = Restaurant;
