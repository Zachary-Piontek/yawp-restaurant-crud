-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS users;

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

CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rating TEXT NOT NULL,
  opinion TEXT NOT NULL
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

INSERT INTO reviews (rating, opinion)
VALUES
(
  '3 stars', 'definitely got the food fast but does not look anything like in commercials'
),
(
  '4 stars', 'fast and good bakeries'
),
(
  '3 stars', 'fast and usually open late but just average food taste'
),
(
  '4 stars', 'service good and food takes some time to arrive but quality is good'
);