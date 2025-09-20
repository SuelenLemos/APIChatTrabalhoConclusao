const Message = require('../models/message');
const { findUser } = require('./userService');

const messages = [];

function sendMessage(from, to, content) {
  if (!findUser(to)) {
    throw new Error('Destinatário não existe');
  }
  if (content.length > 255) {
    throw new Error('Mensagem excede 255 caracteres');
  }
  const message = new Message(from, to, content);
  messages.push(message);
  return message;
}

function getUserMessages(username) {
  return messages.filter(m => m.from === username || m.to === username);
}

module.exports = { sendMessage, getUserMessages };
