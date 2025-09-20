const messageService = require('../services/messageService');

exports.sendMessage = (req, res) => {
  const from = req.user.username;
  const { to, content } = req.body;
  try {
    const message = messageService.sendMessage(from, to, content);
    res.status(201).json({ message: 'Mensagem enviada com sucesso', data: message });
  } catch (err) {
    if (err.message === 'Destinatário não existe') {
      res.status(404).json({ error: 'Usuário de destino não cadastrado' });
    } else if (err.message === 'Remetente não existe') {
      res.status(404).json({ error: 'Usuário remetente não cadastrado' });
    } else if (err.message === 'Mensagem excede 255 caracteres') {
      res.status(413).json({ error: 'Mensagem excede o limite de 255 caracteres' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

exports.listMessages = (req, res) => {
  const username = req.user.username;
  const messages = messageService.getUserMessages(username);
  res.status(200).json({ message: 'Mensagens recuperadas com sucesso', data: messages });
};
