const prefixModel = require("../models/prefix");

module.exports = {
	name: 'messageCreate',
	async execute(msg, client) {

		let serverPrefix = await prefixModel.find({serverId: msg.guild.id});
		const prefix = serverPrefix[0].prefix;
    	if(msg.author.bot || !msg.content.startsWith(prefix)) return ; 

		const args = msg.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if(!client.commands.has(commandName)) return ;
		const command = client.commands.get(commandName);
		
		try{
			command.execute(msg, args, client);
		}catch(err){
			console.log(err);
		}

	},
};