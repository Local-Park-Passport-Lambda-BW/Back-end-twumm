const request = require('supertest');
const server = require('./server');

describe('Main server route', () => {
  it('has process.env.NODE_ENV as "testing"', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  it('returns 200 OK', () => {
    return request(server).get('/')
      .expect(200);
  });

  it('returns welcome text', () => {
    return request(server).get('/')
      .then(res => {
        expect(res.body.message).toBe('Welcome to the LPP - Local Park Passport!');
      });
  });
});
