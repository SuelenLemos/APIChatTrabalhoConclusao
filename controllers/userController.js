const userService = require('../services/userService');

exports.listUsers = (req, res) => {
  const users = userService.listUsers();
  res.json(users);
};
