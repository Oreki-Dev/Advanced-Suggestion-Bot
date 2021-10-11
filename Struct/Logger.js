module.exports = class Logger {
  constructor(client) {
    this.client = client;
  }

  success(title, desc) {
    return console.log("\x1b[32m", title, "\x1b[0m", desc);
  }

  error(title, desc) {
    return console.log("\x1b[31m", title, "\x1b[0m", desc);
  }

  warn(title, desc) {
    return console.log("\x1b[33m", title, "\x1b[0m", desc);
  }
};
