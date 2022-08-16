const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/restaurants return a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(4);
  });

  it('/restaurants:id returns a restaurant with a review', async () => {
    const resp = await request(app).get('/restaurants/1');
    const restaurantOne = {
      review: {
        id: 1,
        name: 'McDonalds',
        service: 'Fast-Food',
        food: 'American'
      },
      id: 1,
      rating: '3 stars',
      opinion: 'definitely got the food fast but does not look anything like in commercials'
    };
    expect(resp.body).toEqual(restaurantOne);
  });

  afterAll(() => {
    pool.end();
  });
});
