module.exports = {
	name: 'guildCreate',
	execute(guild, client) {
		console.log(`${client.user.tag} has logged in to ${guild.name}`);
	},
};