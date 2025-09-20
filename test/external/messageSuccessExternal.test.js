const request = require('supertest');
const app = require('../../app');
const { expect } = require('chai');

describe('[EXTERNAL] - Envio de mensagem com sucesso', () => {
  let tokenSuelen;
  before(async () => {
    // Cadastra Suelen
    await request(app)
      .post('/auth/register')
      .send({ username: 'Suelen', password: 'senha123' });
    // Cadastra Julia
    await request(app)
      .post('/auth/register')
      .send({ username: 'Julia', password: 'senha456' });
    // Login Suelen
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'Suelen', password: 'senha123' });
    tokenSuelen = res.body.token;
  });

  it('deve enviar mensagem de Suelen para Julia com sucesso', async () => {
    const res = await request(app)
      .post('/messages')
      .set('Authorization', `Bearer ${tokenSuelen}`)
      .send({ to: 'Julia', content: 'Olá Julia!' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Mensagem enviada com sucesso');
    expect(res.body.data).to.include({ from: 'Suelen', to: 'Julia', content: 'Olá Julia!' });
  });
});
