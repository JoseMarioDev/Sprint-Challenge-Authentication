const request = require('supertest');

const db = require('../database/dbConfig.js');
const server = require('../api/server');

// 6 tests needed, 2 per endpoint:
// /api/auth/register
// /api/auth/login
// /api/jokes

describe('server', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  //api auth/register
  describe('POST /api/auth/register', () => {
    it('should insert new user, return 201', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'testusers',
          password: 'test1',
        })
        .then(res => {
          // check to see if successful
          expect(res.status).toBe(201);
        });
    });
    it('should return JSON', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'testusers',
          password: 'test1',
        })
        .then(res => {
          expect(res.type).toEqual('application/json');
        });
    });
  });

  //api/auth/login
  describe('POST /api/auth/login', () => {
    it('should login user, return 200', () => {
      return request(server)
        .post('/api/auth/login')
        .send({
          username: 'jmontero',
          password: 'testing123',
        })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it('should return JSON', () => {
      return request(server)
        .post('/api/auth/login')
        .send({
          username: 'jmontero',
          password: 'testing123',
        })
        .then(res => {
          expect(res.type).toEqual('application/json');
        });
    });

    //api/jokes
    describe('get jokes', () => {
      describe('GET /api/jokes', () => {
        it('should return all jokes', () => {
          return request(server)
            .get('/api/jokes')
            .set(
              'Authorization',
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Imptb250ZXJvIiwiand0aWQiOjEsImlhdCI6MTU2NjU3NTg4NSwiZXhwIjoxNTY2NjYyMjg1fQ.IKHPSLHzwCYBqi2c7NcbBKg93zPOuCPCbBB3GPTvj_o',
            )
            .then(res => {
              expect(Array.isArray(res.body)).toBe(true);
            });
        });
        it('should return status 200', () => {
          return request(server)
            .get('/api/jokes')
            .set(
              'Authorization',
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Imptb250ZXJvIiwiand0aWQiOjEsImlhdCI6MTU2NjU3NTg4NSwiZXhwIjoxNTY2NjYyMjg1fQ.IKHPSLHzwCYBqi2c7NcbBKg93zPOuCPCbBB3GPTvj_o',
            )
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
      });
    });
  });
});
