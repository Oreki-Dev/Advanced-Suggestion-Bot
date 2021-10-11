const { MessageEmbed } = require("discord.js");
const _ = require("lodash");

module.exports = {
  name: "listblacklists",
  description: "Shows All The Blacklisted Members",
  run: async (client, interaction) => {
    let data = await client.db.get(`${interaction.guild.id}.blacklists`);

    if (!data || data === [])
      return client.embeds.error(
        interaction,
        "There Are No Blacklisted Members"
      );

    if (data.length > 100) {
      let chunks = 20;
      let description = _.chunk(data, chunks);
      let pages = [];
      for (const d of description) {
        pages.push(
          new MessageEmbed()
            .setTitle("Blacklisted Users")
            .setDescription(
              `${d
                .map((id) => interaction.guild.members.cache.get(id))
                .join("\n")}`
            )
            .setColor(client.color(interaction))
            .setTimestamp()
        );
      }
      await client.pagination.button(interaction, pages);
    } else {
      let embed = new MessageEmbed()
        .setTitle("Blacklisted Members")
        .setDescription(
          `${
            data.length !== 0
              ? data
                  .map((id) => interaction.guild.members.cache.get(id))
                  .join("\n")
              : "```No Blacklists```"
          }`
        )
        .setColor(client.color(interaction))
        .setTimestamp();

      return interaction.followUp({ embeds: [embed] });
    }
  },
};
