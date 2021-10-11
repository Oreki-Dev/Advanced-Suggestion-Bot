const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "suggest",
  description: "Suggest Something For The Guild",
  options: [
    {
      type: "STRING",
      name: "suggestion",
      description: "The Suggestion",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let blacklistcheck = await client.db.get(
      `${interaction.guild.id}.blacklists`
    );
    if (blacklistcheck && blacklistcheck.includes(interaction.user.id))
      return client.embeds.error(
        interaction,
        "You're Blacklisted From Suggesting To This Guild"
      );

    let restrictcheck = await client.db.get(`${interaction.guild.id}.rchannel`);
    if (restrictcheck && interaction.channel.id !== restrictcheck)
      return client.embeds.error(
        interaction,
        `This Command Can Only Be Used In ${
          interaction.guild.channels.cache.get(restrictcheck).name
        }`
      );

    let channelcheck = await client.db.get(`${interaction.guild.id}.schannel`);
    if (!channelcheck)
      return client.embeds.error(
        interaction,
        "There's No Suggestion Channel Set For This Guild"
      );

    let suggestion = interaction.options.getString("suggestion");

    let embed = new MessageEmbed()
      .setTitle(`New Suggestion By ${interaction.user.username}`)
      .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
      .setDescription(`${suggestion}`)
      .setColor(client.color(interaction))
      .setTimestamp();

    client.embeds.success(interaction, "Suggestion Sent");
    return interaction.guild.channels.cache
      .get(channelcheck)
      .send({ embeds: [embed] });
  },
};
