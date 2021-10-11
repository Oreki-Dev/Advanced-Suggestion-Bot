const GammaClient = require("./Struct/GammaClient");
const client = new GammaClient();
client.init();

client.on("error", (err) => {
  client.logger.error("Error", err);
});
client.on("warn", (err) => {
  client.logger.error("Error", err);
});
client.on("debug", (err) => {
  client.logger.warn("Debug", err);
});

process.on("uncaughtException", (err) => {
  client.logger.error("Error", err.stack);
});
