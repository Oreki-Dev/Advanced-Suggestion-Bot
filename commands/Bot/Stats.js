const moment = require("moment");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const { release, cpus } = require("os");

module.exports = {
  name: "stats",
  description: "Bot Stats Page",
  run: async (client, interaction) => {
    const { heapUsed, heapTotal } = process.memoryUsage();
    let { Cversion, Dversion } = client.version();

    let statembed = new MessageEmbed()
      .setTitle(`${client.user.username} | Version : ${Cversion}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.color(interaction))
      .addField(
        "Developer",
        `\`\`\`${client.config.owners
          .map((id) => client.users.cache.get(id).tag)
          .join(", ")}\`\`\``
      )
      .addField("Servers", `\`\`\`${client.guilds.cache.size}\`\`\``)
      .addField("Users", `\`\`\`${client.users.cache.size}\`\`\``)
      .addField("Channels", `\`\`\`${client.channels.cache.size}\`\`\``)
      .addField(
        "Memory Used",
        `\`\`\`${(heapUsed / 1024 / 1024).toFixed(0)} MB\`\`\``
      )
      .addField(
        "Other Info",
        `\`\`\`OS - ${
          process.platform
        } ${release}\nDiscord.JS - ${Dversion}\nNodeJS - ${
          process.version
        }\nCPU - ${cpus()[0].model}\`\`\``
      )
      .addField("Uptime", `\`\`\`${ms(client.uptime)}\`\`\``)
      .setTimestamp();

    interaction.followUp({ embeds: [statembed] });
  },
};
