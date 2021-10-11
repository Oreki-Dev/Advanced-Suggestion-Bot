const { Client, version, Collection } = require("discord.js");
const { performance } = require("perf_hooks");
const Utils = require("./Utils.js");
const Embeds = require("./Embeds.js");
const Logger = require("./Logger.js");
const Pagination = require("./Pagination.js");
const { Database } = require("quickmongo");

module.exports = class GammaClient extends Client {
  constructor() {
    super({
      intents: 32767,
      cacheGuilds: true,
      cacheRoles: true,
      fetchAllMembers: true,
      partials: ["MESSAGE", "CHANNEL", "REACTION"],
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.utils = new Utils(this);
    this.embeds = new Embeds(this);
    this.logger = new Logger(this);
    this.pagination = new Pagination(this);
    this.config = require("../Assets/Json/config");
    this.emotes = require("../Assets/Json/emotes");
    this.db = new Database(this.config.mongo);

    this.bootTime = null;

    this.once("ready", () => {
      return (this.bootTime = Math.round(performance.now()));
    });
  }

  async init() {
    this.utils.loadCommands();
    this.utils.loadEvents();
    super.login(this.config.token);
  }

  version() {
    let Dversion = version;
    let Cversion = require("../package.json").version;

    return { Dversion: Dversion, Cversion: Cversion };
  }

  color(interaction) {
    if (interaction.guild) {
      let color = interaction.guild.me.roles.highest.hexColor;
      if (!color || color === "#000000") color = "#232428";

      return color;
    } else {
      let color = "#232428";
      return color;
    }
  }
};
