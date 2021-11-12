module.exports = {
	name: 'guildCreate',
	execute(guild, client) {
		console.log(`${client.user.tag} has logged in to ${guild.name}!`);
		const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT');
    	channel.send("สวัสดีครับ ผมบอทนักซอย พัฒนาขึ้นโดยจารพูพ");
	}
}