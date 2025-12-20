import http from 'k6/http';
import { check, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { login, generateUserData, generateMessageData } from './helpers.js';

// Variável de Ambiente: Configura baseUrl para diferentes ambientes
const baseUrl = __ENV.BASE_URL || 'http://localhost:3001';

// Thresholds: Limite aceitável para 95% dos usuários (baseado em boas práticas: <500ms para APIs)
export let options = {
  thresholds: {
    http_req_duration: ['p(95)<500'], // Thresholds aplicado: 95% das requests devem ser <500ms
    http_req_failed: ['rate<0.1'], // Menos de 10% de falhas
  },
  // Stages: Ramp up, steady state, ramp down
  stages: [
    { duration: '30s', target: 10 }, // Ramp up: aumenta para 10 usuários
    { duration: '1m', target: 10 },  // Steady: mantém 10 usuários por 1 min
    { duration: '30s', target: 0 },  // Ramp down: diminui para 0
  ],
};

// Trends: Métrica customizada para duração de login
let loginTrend = new Trend('login_duration');

// Data-Driven Testing: Array de dados para testar diferentes cenários
const testUsers = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
  { username: 'user3', password: 'pass3' },
];

export default function () {
  // Selecionar usuário aleatório para data-driven
  const user = testUsers[Math.floor(Math.random() * testUsers.length)];

  let token; // Reaproveitamento de Resposta: variável para armazenar token

  group('Authentication', function () { // Groups: Agrupa testes de autenticação
    const startTime = new Date().getTime();
    token = login(baseUrl, user.username, user.password); // Helpers: Usa função helper para login
    const endTime = new Date().getTime();
    loginTrend.add(endTime - startTime); // Trends: Adiciona duração ao trend

    // Checks: Valida status e resposta da API
    check(token, {
      'token is not empty': (t) => t !== undefined && t !== '',
    });
  });

  // Uso de Token de Autenticação: Verifica se token existe antes de prosseguir
  if (token) {
    group('User Operations', function () { // Groups: Agrupa operações de usuário
      const response = http.get(`${baseUrl}/users`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      // Checks: Valida resposta
      check(response, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
      });
    });

    group('Message Operations', function () { // Groups: Agrupa operações de mensagem
      // Faker: Usa dados fictícios para mensagem via helper
      const messageData = generateMessageData();

      const sendResponse = http.post(`${baseUrl}/messages`, JSON.stringify(messageData), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Uso de Token de Autenticação
        },
      });

      // Checks: Valida envio
      check(sendResponse, {
        'status is 201': (r) => r.status === 201,
      });

      const listResponse = http.get(`${baseUrl}/messages`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      // Checks: Valida listagem
      check(listResponse, {
        'status is 200': (r) => r.status === 200,
      });
    });
  }
}