const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "suggestion",
  description: "Respond To A Suggestion",
  authorPermission: ["ADMINISTRATOR"],
  options: [
    {
      type: "STRING",
      name: "messageid",
      description: "The Message Id Of The Suggestion",
      required: true,
    },
    {
      type: "STRING",
      name: "option",
      description: "The Response To The Suggestion",
      choices: [
        {
          name: "accepted",
          value: "accepted",
        },
        {
          name: "rejected",
          value: "rejected",
        },
        {
          name: "considered",
          value: "considered",
        },
      ],
      required: true,
    },
    {
      type: "STRING",
      name: "reason",
      description: "The Reason",
      required: false,
    },
  ],
  run: async (client, interaction) => {
    let channelcheck = await client.db.get(`${interaction.guild.id}.schannel`);
    if (!channelcheck)
      return client.embeds.error(
        interaction,
        "There's No Suggestion Channel Set For This Guild"
      );
    let channel = interaction.guild.channels.cache.get(channelcheck);
    let messageid = interaction.options.getString("messageid");
    channel.messages.fetch(messageid, false, true).then((message) => {
      console.log(message);
      if (!message)
        return client.embeds.error(
          interaction,
          "That Message Doesn't Exist Anymore"
        );
      const oldEmbed = message.embeds[0];

      const embed = new MessageEmbed()
        .setTitle(oldEmbed.title)
        .setDescription(oldEmbed.description)
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

      let response = interaction.options.getString("option");
      let reason = interaction.options.getString("reason");

      if (response === "accepted") {
        embed.setColor("GREEN");
        embed.addField("Response", `${reason ? reason : "Accepted"}`);
      } else if (response === "rejected") {
        embed.setColor("RED");
        embed.addField("Response", `${reason ? reason : "Rejected"}`);
      } else if (response === "considered") {
        embed.setColor("YELLOW");
        embed.addField("Response", `${reason ? reason : "Considered"}`);
      } else {
        //do nothing
      }
      message.edit({ embeds: [embed] });
    });
    return client.embeds.success(interaction, "Replied To The Suggestion");
  },
};
