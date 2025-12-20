import http from 'k6/http';

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
    username: 'testuser' + Math.floor(Math.random() * 1000),
    password: 'password123'
  };
}

// Helper: Gerar dados fictícios para mensagens
export function generateMessageData() {
  return {
    to: 'user1',
    content: 'Mensagem de teste ' + Math.floor(Math.random() * 1000)
  };
}