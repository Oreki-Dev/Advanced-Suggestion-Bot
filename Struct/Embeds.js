module.exports = class Embeds {
  constructor(client) {
    this.client = client;
  }

  normal(interaction, title, desc) {
    interaction.followUp({
      embeds: [
        {
          title: title,
          description: `\`\`\`${desc}\`\`\``,
          color: this.client.color(interaction),
          thumbnail: {
            url: this.client.user.displayAvatarURL(),
          },
          timestamp: new Date(),
        },
      ],
    });
  }

  success(interaction, desc) {
    interaction.followUp({
      embeds: [
        {
          title: "Success",
          description: `\`\`\`${desc}\`\`\``,
          color: this.client.color(interaction),
          thumbnail: {
            url: this.client.user.displayAvatarURL(),
          },
          timestamp: new Date(),
        },
      ],
    });
  }

  error(interaction, desc) {
    interaction.followUp({
      embeds: [
        {
          title: "Error",
          description: `\`\`\`${desc}\`\`\``,
          color: this.client.color(interaction),
          thumbnail: {
            url: this.client.user.displayAvatarURL(),
          },
          timestamp: new Date(),
        },
      ],
    });
  }
};
