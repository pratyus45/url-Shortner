const request = require('supertest');
const app = require('../server'); // If server.js exports app
const mongoose = require('mongoose');
const shortURL = require('../models/shortURL');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/testDB');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /api/shorten', () => {
  it('should generate a unique short code', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ url: 'https://example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.short_url).toMatch(/https?:\/\/.*\/\w{6,8}/);
  });
});
