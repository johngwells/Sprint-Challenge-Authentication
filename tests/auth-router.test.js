const request = require('supertest');
const bcrypt = require('bcryptjs');

const server = require('../api/server');
const db = require('../database/dbConfig');
const { add } = require('../users/users-model');

const testUser = {
  username: 'sphongle',
  password: 'rabbithole'
};

describe('Auth Router Tests', () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe('POST /register', () => {
    it('returns 201 status code and an authorization token', async () => {
      const user = {
        username: 'test',
        password: 'test'
      };

      const res = await request(server)
        .post('/api/auth/register')
        .send(user);

      await expect(res.status).toBe(201);
      await expect(res.body.token).toBeDefined();
    });

    it('returns the created user from database', async () => {
      const user = {
        username: 'test',
        password: 'test'
      };

      const [id] = await db('users').insert(user);

      const newUser = await db('users')
        .where({ id })
        .first();
      await expect(newUser.username).toBe('test');
      await expect(newUser.id).toBeDefined();
    });
  });

  describe('POST /login', () => {
    it('returns 201 status code', async () => {
      const testUser = {
        username: 'sphongle',
        password: 'rabbithole'
      };

      const hashedPassword = bcrypt.hashSync(testUser.password, 12);
      testUser.password = hashedPassword;

      await add(testUser);

      const res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'sphongle',
          password: 'rabbithole'
        });

      await expect(res.status).toBe(200);
    });

    it('returns a welcome message and a token on log in', async () => {
      const testUser = {
        username: 'sphongle',
        password: 'rabbithole'
      };

      const hashedPassword = bcrypt.hashSync(testUser.password, 12);
      testUser.password = hashedPassword;

      await add(testUser);

      const res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'sphongle',
          password: 'rabbithole'
        });

      await expect(res.body.message).toContain('Success! You are logged in!');
      await expect(res.body.token).toBeDefined();
    });
  });
});
