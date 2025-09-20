const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

exports.register = (req, res) => {
  const { username, password } = req.body;
  try {
    const user = userService.registerUser(username, password);
    res.status(201).json({ username: user.username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  try {
    const user = userService.authenticateUser(username, password);
    const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
