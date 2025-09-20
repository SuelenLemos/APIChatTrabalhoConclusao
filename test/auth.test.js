const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Auth API', () => {
  it('deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'user1', password: 'senha123' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('username', 'user1');
  });

  it('não deve registrar usuário duplicado', async () => {
    await request(app)
      .post('/auth/register')
      .send({ username: 'user2', password: 'senha123' });
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'user2', password: 'senha123' });
    expect(res.status).to.equal(409);
    expect(res.body).to.have.property('error', 'Usuário já existe');
  });
// Teste de controller usando sinon
const sinon = require('sinon');
const authController = require('../controllers/authController');
describe('Auth Controller (sinon)', () => {
  it('deve retornar 201 ao cadastrar novo usuário', async () => {
    const req = { body: { username: 'sinonUser', password: 'senha123' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    await authController.register(req, res);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, sinon.match.has('message', 'Usuário cadastrado com sucesso'));
  });
});

  it('deve autenticar usuário e retornar token', async () => {
    await request(app)
      .post('/auth/register')
      .send({ username: 'user3', password: 'senha123' });
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'user3', password: 'senha123' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('não deve autenticar com senha errada', async () => {
    await request(app)
      .post('/auth/register')
      .send({ username: 'user4', password: 'senha123' });
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'user4', password: 'errada' });
    expect(res.status).to.equal(401);
  });
});
