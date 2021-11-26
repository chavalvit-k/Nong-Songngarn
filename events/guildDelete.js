const { MessageEmbed } = require("discord.js");
const jobModel = require("../models/schema");
const prefixModel = require("../models/prefix.js");

module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
		
		console.log(`${client.user.tag} has remove from ${guild.name}!`);

        prefix = await prefixModel.findOne({serverId: guild.id});
        prefix.deleteOne({});

        await jobModel.deleteMany({serverId: guild.id});

	}
}