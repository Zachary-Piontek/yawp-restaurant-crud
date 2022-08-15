-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  service TEXT NOT NULL,
  food TEXT NOT NULL
);

INSERT INTO restaurants (name, service, food)
VALUES
(
  'McDonalds', 'Fast-Food', 'American'
),
(
  'Panera Bread', 'Fast-Casual', 'Bakery'
),
(
  'Taco Bell', 'Fast-Food', 'Mexican'
),
(
  'TGI Fridays', 'Casual-Dining', 'American'
);