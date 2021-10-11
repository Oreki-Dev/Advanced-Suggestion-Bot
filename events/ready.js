module.exports = {
  name: "ready",
  run: async (client) => {
    let msg = "**[REBOOT]**";
    let users = client.users.cache.size;
    let servers = client.guilds.cache.size;
    let channels = client.channels.cache.size;
    let emojis = client.emojis.cache.size;
    let embed = {
      description: [
        "```",
        `Commands | ${client.commands.size}`,
        `Events   | ${client._eventsCount}`,
        `BootTime | ${client.bootTime}'ms`,
        `Guilds   | ${servers}`,
        `Users    | ${users}`,
        `Channels | ${channels}`,
        `Emojis   | ${emojis}`,
        "```",
      ].join("\n"),
      color: "#9B30FF",
    };

    client.channels.cache
      .get(client.config.readyChannel)
      .send({ content: `${msg}`, embeds: [embed] });
  },
};
