const User = require('../models/user');

const users = [];

function findUser(username) {
  return users.find(u => u.username === username);
}

function registerUser(username, password) {
  if (findUser(username)) {
    throw new Error('Usuário já existe');
  }
  const user = new User(username, password);
  users.push(user);
  return user;
}

function authenticateUser(username, password) {
  const user = findUser(username);
  if (!user || !user.verifyPassword(password)) {
    throw new Error('Credenciais inválidas');
  }
  return user;
}

function listUsers() {
  return users.map(u => ({ username: u.username }));
}

module.exports = { registerUser, authenticateUser, listUsers, findUser };
