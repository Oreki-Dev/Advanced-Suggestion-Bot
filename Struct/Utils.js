const { sync } = require("glob");
const { resolve } = require("path");

module.exports = class Utils {
  constructor(client) {
    this.client = client;
  }
  async loadCommands() {
    const commandFiles = sync(resolve("./commands/**/*.js"));

    let array = [];
    let array2 = [];

    for (const filepath of commandFiles) {
      const command = require(filepath);
      if (command) {
        if (!command.ownerOnly) {
          this.client.commands.set(command.name, command);
          array.push(command);
        } else {
          this.client.commands.set(command.name, command);
          array2.push(command);
        }
      } else {
        continue;
      }
    }
    this.client.on("ready", async (client) => {
      await client.application.commands.set(array);
      await client.guilds.cache.get("893376258946256947").commands.set(array2);
    });
    this.client.logger.success("Command", "All Commands Loaded");
  }
  async loadEvents() {
    const eventFiles = sync(resolve("./events/*.js"));

    for (const filepath of eventFiles) {
      const event = require(filepath);
      if (event) {
        this.client.on(event.name, event.run.bind(null, this.client));
      } else {
        continue;
      }
    }

    this.client.logger.success("Events", "All Events Loaded");
  }
};
