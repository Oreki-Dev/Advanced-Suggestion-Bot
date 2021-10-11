const { exec } = require("child_process");

module.exports = {
  name: "shell",
  description: "Owner Only Command",
  ownerOnly: true,
  options: [
    {
      type: "STRING",
      name: "code",
      description: "Code To Run",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let code = interaction.options.getString("code");
    exec(code, (error, stdout) => {
      let result = stdout || error;
      client.embeds.normal(
        interaction,
        `${error ? "Error" : "Success"}`,
        result.substring(0, 1500)
      );
    });
  },
};
