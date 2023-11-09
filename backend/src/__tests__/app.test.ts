const Mongoose = require('mongoose');
const express = require('express');
const request = require('supertest');
const app = express();

beforeAll(async () => {
  await Mongoose.connect('mongodb://127.0.0.1:27017/itranslate_test');
});

afterAll(async () => {
  await Mongoose.connection.close();
});

describe('POST /', () => {
  it('should create a Translation', async () => {
    const response = await request(app)
      .post('/')
      .send({ queryLanguage: 'English', queryWord: 'Horse', translationLanguage: 'Spanish', translationWord: 'Caballo' });
    expect(response.statusCode).toBe(201);
  });
});

describe('GET /?', () => {
  it('should retrieve a Translation', async () => {
    const response = await request(app).get('/?queryLanguage=English&queryWord=Horse&translationLanguage=Spanish');
    expect(response.statusCode).toBe(200);
  });
});

describe('PATCH /', () => {
  it('should update a Translation', async () => {
    const response = await request(app)
      .patch('/')
      .send({ queryLanguage: 'English', queryWord: 'Horse', translationLanguage: 'German', translationWord: 'Pferd' });
    expect(response.statusCode).toBe(204);
  });
});

describe('DELETE /', () => {
  it('should Delete a Translation', async () => {
    const response = await request(app).delete('/').send({ queryLanguage: 'English', queryWord: 'Horse' });
    expect(response.statusCode).toBe(204);
  });
});
