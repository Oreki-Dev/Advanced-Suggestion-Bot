module.exports = {
  name: "eval",
  description: "Owner Only Command",
  ownerOnly: true,
  options: [
    {
      type: "STRING",
      name: "code",
      description: "Code To Evaluate",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let code = interaction.options.getString("code");

    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    try {
      return client.embeds.normal(
        interaction,
        "Eval",
        evaled.substring(0, 1900)
      );
    } catch (e) {
      return client.embeds.error(interaction, `${e}`);
    }
  },
};
