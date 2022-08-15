const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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

  it('example test - delete me!', () => {
    expect(1).toEqual(1);
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

  it('return current user', async () => {
    const [agent, user] = await registerAndLogin();
    const me = await agent.get('/api/v1/users/sessions');
    console.log(me.body);
    expect(me.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
