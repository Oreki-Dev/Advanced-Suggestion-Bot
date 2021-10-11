module.exports = {
  name: "resetsuggestchannel",
  description: "Reset The Suggestion Channel",
  run: async (client, interaction) => {
    let channelcheck = await client.db.get(`${interaction.guild.id}.schannel`);
    if (!channelcheck)
      return client.embeds.error(interaction, "Suggestion Channel Is Not Set");

    await client.db.delete(`${interaction.guild.id}.schannel`);
    return client.embeds.success(interaction, "Suggestion Channel Deleted");
  },
};
