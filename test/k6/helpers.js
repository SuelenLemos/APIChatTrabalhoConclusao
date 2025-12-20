import { faker } from 'https://esm.sh/@faker-js/faker@6.6.6';

// Helper: Função para fazer login e retornar token
// Usa Faker para gerar dados fictícios se necessário, mas aqui para login usa dados passados
export function login(baseUrl, username, password) {
  const response = http.post(`${baseUrl}/auth/login`, JSON.stringify({
    username: username,
    password: password
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.json().token; // Reaproveitamento de resposta: extrai token da resposta
}

// Helper: Gerar dados fictícios para usuários
export function generateUserData() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password()
  };
}

// Helper: Gerar dados fictícios para mensagens
export function generateMessageData() {
  return {
    to: faker.internet.userName(), // Simula destinatário
    content: faker.lorem.sentence()
  };
}