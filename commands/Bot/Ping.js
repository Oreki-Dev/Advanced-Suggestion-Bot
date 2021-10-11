module.exports = {
  name: "ping",
  description: "Shows Client's Latency",
  run: async (client, interaction) => {
    let database = await client.db.ping();
    return client.embeds.normal(
      interaction,
      "Client's Latency",
      `Client - ${client.ws.ping}'ms 🏓\nDatabase - ${database.average}'ms 🏓`
    );
  },
};
