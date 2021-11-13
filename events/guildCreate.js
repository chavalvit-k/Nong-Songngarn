const { MessageEmbed } = require("discord.js");
const helpInformation = require("../utils/helpInformation");

module.exports = {
	name: 'guildCreate',
	execute(guild, client) {
		console.log(`${client.user.tag} has logged in to ${guild.name}!`);
		const embed = new MessageEmbed().setDescription(`**สวัสดีจ้าา น้องส่งงานมาแล้ววว**\n\n${helpInformation}`)
		const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT');
		channel.send({ embeds: [embed] });
	}
}