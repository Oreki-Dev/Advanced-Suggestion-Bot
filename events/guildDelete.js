const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildDelete",
  run: async (client, guild) => {
    const channel = client.channels.cache.get(client.config.leaveChannel);
    if (!channel) return;

    const embed = new MessageEmbed()
      .setTitle("I Left A Guild!")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `\`\`\`Guild Name: ${guild.name} (${guild.id})\nMembers: ${guild.memberCount}\`\`\``
      )
      .setTimestamp()
      .setColor("#9B30FF")
      .setFooter(`I'm In ${client.guilds.cache.size} Guilds Now!`);

    channel.send({ embeds: [embed] });
    await client.db.delete(`${guild.id}`);
  },
};
