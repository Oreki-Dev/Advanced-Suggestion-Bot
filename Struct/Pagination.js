const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = class Pagination {
  constructor(client) {
    this.client = client;
  }

  async button(interaction, pages) {
    let timeout = 60000;

    const previousButton = new MessageButton()
      .setCustomId("previous")
      //.setLabel("Previous")
      .setStyle("PRIMARY")
      .setEmoji(`${this.client.emotes.previous}`);

    const nextButton = new MessageButton()
      .setCustomId("next")
      //.setLabel("Next")
      .setStyle("PRIMARY")
      .setEmoji(`${this.client.emotes.next}`);

    const stopButton = new MessageButton()
      .setCustomId("stop")
      //.setLabel("Stop")
      .setStyle("DANGER")
      .setEmoji(`${this.client.emotes.stop}`);

    const row = new MessageActionRow().addComponents(
      previousButton,
      stopButton,
      nextButton
    );

    await pages[0].setFooter(`Page 1/${pages.length}`);
    await interaction.followUp({ embeds: [pages[0]], components: [row] });

    const msg = await interaction.fetchReply();

    const filter = (m) => m;
    const collector = msg.createMessageComponentCollector({
      filter,
      time: timeout,
    });

    let currentPage = 0;
    let stopped = false;

    collector.on("collect", async (component) => {
      component.deferUpdate();
      if (component.user.id !== interaction.user.id) return;

      if (component.customId === "previous") {
        if (currentPage === 0) currentPage = pages.length - 1;
        else await currentPage--;

        await pages[currentPage].setFooter(
          `Page ${currentPage + 1}/${pages.length}`
        );
        interaction.editReply({
          embeds: [pages[currentPage]],
          components: [row],
        });
      } else if (component.customId === "next") {
        if (currentPage === pages.length - 1) currentPage = 0;
        else await currentPage++;

        await pages[currentPage].setFooter(
          `Page ${currentPage + 1}/${pages.length}`
        );
        await interaction.editReply({
          embeds: [pages[currentPage]],
          components: [row],
        });
      } else {
        collector.stop();
        stopped = true;

        await previousButton.setDisabled();
        await nextButton.setDisabled();
        await stopButton.setDisabled();

        await pages[currentPage].setFooter(
          `Page ${currentPage + 1}/${pages.length}`
        );
        await interaction.editReply({
          embeds: [pages[currentPage]],
          components: [],
        });
      }
    });

    collector.on("end", async () => {
      if (stopped === true) return;

      await previousButton.setDisabled();
      await nextButton.setDisabled();
      await stopButton.setDisabled();

      await pages[currentPage].setFooter(
        `Page ${currentPage + 1}/${pages.length}`
      );
      await interaction.editReply({
        embeds: [pages[currentPage]],
        components: [],
      });
    });
  }
};
