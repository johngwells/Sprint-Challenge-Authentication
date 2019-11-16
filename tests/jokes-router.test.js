const request = require('supertest');
// const jwt = require("jsonwebtoken");

const server = require('../api/server');
const generateToken = require('../auth/generateToken');
const authenticate = require('../auth/authenticate-middleware');
// const { jwtSecret } = require("../config/secrets");

describe('Jokes Router Tests', () => {
  describe('GET /jokes', () => {
    it('returns 401 status code if not provided a token', async () => {
      const res = await request(server).get('/api/jokes');

      await expect(res.status).toBe(401);
    });

    it('returns 200 status code when provided a jwt, and receive array of jokes', async () => {
      const token = generateToken({ id: 1, username: 'test' });

      const res = await request(server)
        .get('/api/jokes', authenticate)
        .set('authorization', token);
      await expect(res.status).toBe(200);
      await expect(res.body[0].id).toBeDefined();
      await expect(res.body[0].joke).toBeDefined();
      await expect(Object.getOwnPropertyNames(res.body[0])).toHaveLength(2);
    });
  });
});
