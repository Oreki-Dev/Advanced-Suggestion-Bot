module.exports = {
  name: "whitelist",
  description: "Whitelist A Previously Blacklisted User",
  authorPermission: ["ADMINISTRATOR"],
  options: [
    {
      type: "USER",
      name: "mention",
      description: "The User You Want To Whitelist",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let member = interaction.options.getMember("mention");

    if (member.user.id === client.user.id)
      return client.embeds.error(interaction, "I'm Not Blacklisted");
    if (member.user.id === interaction.user.id)
      return client.embeds.error(
        interaction,
        "You Can't Run This Command On Yourself"
      );
    if (
      member.roles.highest.position >=
      interaction.guild.members.cache.get(interaction.user.id).roles.highest
        .position
    )
      return client.embeds.error(
        interaction,
        "You Can't Whitelist That Member"
      );
    if (member.user.id === interaction.guild.ownerId)
      return client.embeds.error(
        interaction,
        "Guild Owners Can't Be Blacklisted"
      );

    let data = await client.db.get(`${interaction.guild.id}.blacklists`);

    if (!data || data === [])
      return client.embeds.error(
        interaction,
        "There Are No Blacklisted Members"
      );

    if (!data.includes(member.user.id))
      return client.embeds.error(interaction, "That Member Is'nt Blacklisted");
    let array = data.filter((id) => id !== member.user.id);

    await client.db.set(`${interaction.guild.id}.blacklists`, array);
    return client.embeds.success(
      interaction,
      `Whitelisted ${member.user.username}`
    );
  },
};
