const messageService = require('../services/messageService');

exports.sendMessage = (req, res) => {
  const from = req.user.username;
  const { to, content } = req.body;
  try {
    const message = messageService.sendMessage(from, to, content);
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listMessages = (req, res) => {
  const username = req.user.username;
  const messages = messageService.getUserMessages(username);
  res.json(messages);
};
