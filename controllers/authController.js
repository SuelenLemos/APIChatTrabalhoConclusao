const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

exports.register = (req, res) => {
  const { username, password } = req.body;
  try {
    const user = userService.registerUser(username, password);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', username: user.username });
  } catch (err) {
    if (err.message === 'Usuário já existe') {
      res.status(409).json({ error: 'Usuário já existe' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  try {
    const user = userService.authenticateUser(username, password);
    const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (err) {
    res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }
};
