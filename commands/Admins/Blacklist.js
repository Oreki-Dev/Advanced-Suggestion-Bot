module.exports = {
  name: "blacklist",
  description: "Blacklist A User From Suggesting Something For This Guild",
  authorPermission: ["ADMINISTRATOR"],
  options: [
    {
      type: "USER",
      name: "mention",
      description: "The User You Want To Blacklist",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let member = interaction.options.getMember("mention");

    if (member.user.id === client.user.id)
      return client.embeds.error(interaction, "Why Would You Blacklist Me?");
    if (member.user.id === interaction.user.id)
      return client.embeds.error(
        interaction,
        "You Want To Blacklist Yourself?"
      );
    if (
      member.roles.highest.position >=
      interaction.guild.members.cache.get(interaction.user.id).roles.highest
        .position
    )
      return client.embeds.error(
        interaction,
        "You Can't Blacklist That Member"
      );
    if (member.user.id === interaction.guild.ownerId)
      return client.embeds.error(
        interaction,
        "You Want To Blacklist Guild Owner?"
      );

    let data = await client.db.get(`${interaction.guild.id}.blacklists`);

    if (!data) await client.db.set(`${interaction.guild.id}.blacklists`, []);

    if (data.includes(member.user.id))
      return client.embeds.error(
        interaction,
        "That User Is Already Blacklisted"
      );

    await client.db.push(
      `${interaction.guild.id}.blacklists`,
      `${member.user.id}`
    );
    return client.embeds.success(
      interaction,
      `Blacklisted ${member.user.username}`
    );
  },
};
