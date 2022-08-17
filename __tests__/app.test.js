const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const userExample = {
  firstName: 'Ronald',
  lastName: 'McDonald',
  email: 'doubleQuarterpounder@mcd.com',
  password: 'McDonalds',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? userExample.password;

  const agent = request.agent(app);
  
  const user = await UserService.create({ ...userExample, ...userProps });
  
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('create new user', async () => {
    const res = await request(app).post('/api/v1/users').send(userExample);
    const { firstName, lastName, email } = userExample;
    console.log(userExample);
    console.log(res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(userExample);
    const res = await request(app)
      // test of email / password don't match
      .post('/api/v1/users/sessions')
      .send({ email: 'doubleQuarterpounder@mcd.com', password: 'McDonalds' });
    expect(res.status).toEqual(200);
  });

  it('should return a 403 when signed in but not admin and listing all users', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/users');
    console.log(res.body);
    expect(res.body).toEqual({
      message: 'You do not have access to view this page',
      status: 403,
    });
  });

  it('should return a list of users if signed in as admin', async () => {
    const [agent, user] = await registerAndLogin({ email: 'admin' });
    const res = await agent.get('/api/v1/users');
    expect(res.body).toEqual([{ ...user }]);
  });

  it('/restaurants/:id/reviews create new review', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/users').send(userExample);
    console.log(agent.body);
    const resp = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send({ rating: '5 stars', opinion: 'Great every, single, time' });
    expect(resp.body).toEqual({
      id: '5',
      rating: '5 stars',
      opinion: 'Great every, single, time',
    });
    console.log(resp.body);
  });


  afterAll(() => {
    pool.end();
  });
});
