const request = require('supertest');
const app = require('../../app');
const { expect } = require('chai');

describe('External - Mensagem para usuário não cadastrado', () => {
  let token;
  before(async () => {
    await request(app)
      .post('/auth/register')
      .send({ username: 'Suelen', password: 'senha123' });
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'Suelen', password: 'senha123' });
    token = res.body.token;
  });

  it('deve retornar 404 ao enviar mensagem para usuário não cadastrado', async () => {
    const res = await request(app)
      .post('/messages')
      .set('Authorization', `Bearer ${token}`)
      .send({ to: 'Julio', content: 'Olá!' });
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error', 'Usuário de destino não cadastrado');
  });
});
