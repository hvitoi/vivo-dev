import request from 'supertest';
import { app } from '../src/app';

import {
  reqFrontend,
  reqBacked,
  reqMobile,
  reqGeneric,
  reqFrontBack,
  reqInvalidEmail
} from './fixtures/request-content'; // Modelos de request

import {
  resFrontend,
  resBackend,
  resMobile,
  resGeneric,
  resFrontBack,
  resError
} from './fixtures/response-content'; // Modelos de response

test('Resposta exclusivamente para Frontend', async () => {
  const res = await request(app).post('/api').send(reqFrontend).expect(200);
  expect(res.body).toEqual(resFrontend);
});
test('Resposta exclusivamente para Backend', async () => {
  const res = await request(app).post('/api').send(reqBacked).expect(200);
  expect(res.body).toEqual(resBackend);
});
test('Resposta exclusivamente para Mobile', async () => {
  const res = await request(app).post('/api').send(reqMobile).expect(200);
  expect(res.body).toEqual(resMobile);
});
test('Resposta genérica', async () => {
  const res = await request(app).post('/api').send(reqGeneric).expect(200);
  expect(res.body).toEqual(resGeneric);
});

// ---

test('Resposta para frontend e backend', async () => {
  const res = await request(app).post('/api').send(reqFrontBack).expect(200);
  expect(res.body).toEqual(resFrontBack);
});

// ---

test('Solicitação com email inválido', async () => {
  request(app)
    .post('/api')
    .send(reqInvalidEmail)
    .expect(function (res) {
      expect(res.body).toEqual(resError);
    });
});
