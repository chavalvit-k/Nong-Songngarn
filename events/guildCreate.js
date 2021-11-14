const { MessageEmbed } = require("discord.js");
const helpInformation = require("../utils/helpInformation");
const prefixModel = require("../models/prefix.js");

module.exports = {
	name: 'guildCreate',
	async execute(guild, client) {
		console.log(`${client.user.tag} has logged in to ${guild.name}!`);

		let prefix = await prefixModel.create({
			serverId: guild.id,
			prefix: "-"
		});
		prefix.save();

		const help = helpInformation(guild.id);
		const embed = new MessageEmbed().setDescription(`**สวัสดีจ้าา น้องส่งงานมาแล้ววว**\n\n${help}`)
		const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT');

		channel.send({ embeds: [embed] });
	}
}