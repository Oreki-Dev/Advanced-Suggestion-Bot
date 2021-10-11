module.exports = {
  name: "resetrestrict",
  description: "Reset The Restriction Channel",
  run: async (client, interaction) => {
    let channelcheck = await client.db.get(`${interaction.guild.id}.rchannel`);
    if (!channelcheck)
      return client.embeds.error(
        interaction,
        "Restricted Commands Channel Is Not Set"
      );

    await client.db.delete(`${interaction.guild.id}.rchannel`);
    return client.embeds.success(interaction, "Restricted Channel Deleted");
  },
};
