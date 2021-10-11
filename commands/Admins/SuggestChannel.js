module.exports = {
  name: "suggestchannel",
  description: "Setup The Suggestion Channel",
  authorPermission: ["ADMINISTRATOR"],
  options: [
    {
      type: "CHANNEL",
      name: "channel",
      description: "The Channel You Want To Set",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let data = await client.db.get(`${interaction.guild.id}.schannel`);
    let channel = interaction.options.getChannel("channel");
    if (channel.type !== "GUILD_TEXT")
      return client.embeds.error(interaction, "Channel Must Be Text Channel");
    if (channel.id === data)
      return client.embeds.error(
        interaction,
        "That Channel Is Already Set As Suggestion Channel"
      );

    await client.db.set(`${interaction.guild.id}.schannel`, channel.id);
    return client.embeds.success(
      interaction,
      `${channel.name} Set As Suggestion Channel`
    );
  },
};
