const { MessageEmbed } = require("discord.js");
const prefixModel = require("../models/prefix.js");

module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
		console.log(`${client.user.tag} has remove from ${guild.name}!`);

        prefix = await prefixModel.findOne({serverId: guild.id});
        prefix.deleteOne({});

		// const embed = new MessageEmbed().setDescription(`**เตะกูทำเหี้ยไรไอ้สัส เดี๋ยวมึงเจอกูแน่!**`)
		// const channel = client.channels.cache.find(channel => channel.type === 'GUILD_TEXT');

		// channel.send({ embeds: [embed] });
        
	}
}