"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Mongoose = require('mongoose');
const express = require('express');
const request = require('supertest');
const app = express();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Mongoose.connect('mongodb://127.0.0.1:27017/itranslate_test');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Mongoose.connection.close();
}));
describe('POST /', () => {
    it('should create a Translation', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/')
            .send({ queryLanguage: 'English', queryWord: 'Horse', translationLanguage: 'Spanish', translationWord: 'Caballo' });
        expect(response.statusCode).toBe(201);
    }));
});
describe('GET /?', () => {
    it('should retrieve a Translation', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get('/?queryLanguage=English&queryWord=Horse&translationLanguage=Spanish');
        expect(response.statusCode).toBe(200);
    }));
});
describe('PATCH /', () => {
    it('should update a Translation', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .patch('/')
            .send({ queryLanguage: 'English', queryWord: 'Horse', translationLanguage: 'German', translationWord: 'Pferd' });
        expect(response.statusCode).toBe(204);
    }));
});
describe('DELETE /', () => {
    it('should Delete a Translation', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).delete('/').send({ queryLanguage: 'English', queryWord: 'Horse' });
        expect(response.statusCode).toBe(204);
    }));
});
