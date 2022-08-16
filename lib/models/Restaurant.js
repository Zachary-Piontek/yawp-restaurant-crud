const pool = require('../utils/pool');

class Restaurant {
  id;
  name;
  service;
  food;


  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.service = row.service;
    this.food = row.food;
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
}

module.exports = Restaurant;
