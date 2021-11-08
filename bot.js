const Discord = require("discord.js");
const {Intents} = require("discord.js");
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
const fs = require("fs");
require("dotenv").config();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); // read JS file in events folder 

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.TOKEN);
