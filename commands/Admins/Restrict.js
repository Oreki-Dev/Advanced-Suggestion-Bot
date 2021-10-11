module.exports = {
  name: "restrict",
  description: "Restrict The Suggest Command",
  authorPermission: ["ADMINISTRATOR"],
  options: [
    {
      type: "CHANNEL",
      name: "channel",
      description: "The Channel That Should Be Used While Suggesting",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let channelcheck = await client.db.get(`${interaction.guild.id}.schannel`);
    if (!channelcheck)
      return client.embeds.error(
        interaction,
        "Suggestion Channel Is Not Set In This Guild"
      );

    let channel = interaction.options.getChannel("channel");

    if (channel.id === channelcheck)
      return client.embeds.error(
        interaction,
        "The Suggestion Channel And Restricted Commands Channel Cannot Be Same"
      );
    if (channel.type !== "GUILD_TEXT")
      return client.embeds.error(interaction, "Channel Must Be A Text Channel");

    let data = await client.db.get(`${interaction.guild.id}.rchannel`);

    if (channel.id === data)
      return client.embeds.error(
        interaction,
        "That Channel Is Already Set As Restricted Commands Channel"
      );

    await client.db.set(`${interaction.guild.id}.rchannel`, channel.id);
    return client.embeds.success(
      interaction,
      `${channel.name} Set As Restricted Commands Channel`
    );
  },
};
