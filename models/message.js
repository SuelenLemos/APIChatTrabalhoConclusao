class Message {
  constructor(from, to, content) {
    this.from = from;
    this.to = to;
    this.content = content;
    this.timestamp = new Date();
  }
}

module.exports = Message;
