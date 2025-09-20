const bcrypt = require('bcrypt');

class User {
  constructor(username, password) {
    this.username = username;
    this.passwordHash = bcrypt.hashSync(password, 10);
    this.messages = [];
  }

  verifyPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}

module.exports = User;
