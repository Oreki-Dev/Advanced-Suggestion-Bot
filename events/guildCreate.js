const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildCreate",
  run: async (client, guild) => {
    const channel = client.channels.cache.get(client.config.joinChannel);
    if (!channel) return;

    const embed = new MessageEmbed()
      .setTitle("I Joined A Guild!")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `\`\`\`Guild Name: ${guild.name} (${guild.id})\nMembers: ${guild.memberCount}\`\`\``
      )
      .setTimestamp()
      .setColor("#9B30FF")
      .setFooter(`I'm In ${client.guilds.cache.size} Guilds Now!`);

    channel.send({ embeds: [embed] });
  },
};
