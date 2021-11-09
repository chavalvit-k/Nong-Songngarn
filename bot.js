const Discord = require("discord.js");
const fs = require("fs");
const {Intents} = require("discord.js");
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
require("dotenv").config();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); 	// read JS file in commands folder 
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); 	// read JS file in events folder 

for (const file of commandFiles) {					// set command to client.command
	const command = require(`.commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.TOKEN);
