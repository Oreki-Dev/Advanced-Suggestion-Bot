module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isCommand()) {
      await interaction.deferReply({ ephemeral: false });

      const command = client.commands.get(interaction.commandName);
      if (!command)
        return client.embeds.error(interaction, "An Error Occurred");

      if (command.botPermission) {
        let neededPerms = [];
        command.botPermission.forEach((p) => {
          if (!interaction.guild.me.permissions.has(p)) neededPerms.push(p);
        });

        if (neededPerms.length)
          return client.embeds.error(
            interaction,
            `I Need ${neededPerms.join(" ")} Permissions`
          );
      }
      if (command.authorPermission) {
        let neededPerms = [];
        command.authorPermission.forEach((p) => {
          if (!interaction.member.permissions.has(p)) neededPerms.push(p);
        });

        if (neededPerms.length)
          return client.embeds.error(
            interaction,
            `${neededPerms.join(", ")} Permission Needed`
          );
      }

      if (
        command.ownerOnly &&
        !client.config.owners.includes(interaction.user.id)
      )
        return client.embeds.error(interaction, "Owner Only Command");

      if (command) {
        command.run(client, interaction);
      }
    }
  },
};
