const server = require('../api/server');
const request = require('supertest');

const generateToken = require('../auth/generateToken');

describe('Users Router Tests', () => {
  describe('GET /', () => {
    it('returns 200 status code', async () => {
      const token = generateToken({ id: 1, username: 'test' });
      const res = await request(server)
        .get('/api/users')
        .set('authorization', token);
      await expect(res.status).toBe(200);
    });

    it('returns an array of users', async () => {
      const token = generateToken({ id: 1, username: 'test' });
      const res = await request(server)
        .get('/api/users')
        .set('authorization', token);
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].username).toBeDefined();
    });
  });
});
