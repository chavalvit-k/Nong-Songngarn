const { MessageEmbed } = require("discord.js");
const jobModel = require("../models/schema");
const prefixModel = require("../models/prefix.js");
const notificationModel = require("../models/notification");

module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
		
		console.log(`${client.user.tag} has remove from ${guild.name}!`);

        let prefix = await prefixModel.findOne({serverId: guild.id});
        prefix.deleteOne({});

		let notification = await notificationModel.findOne({serverId: guild.id});
		notification.deleteOne({});
		
        await jobModel.deleteMany({serverId: guild.id});

	}
}