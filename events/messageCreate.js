require("dotenv").config();

module.exports = {
	name: 'messageCreate',
	execute(msg, client) {
		const prefix = process.env.PREFIX;
    	if(msg.author.bot || !msg.content.startsWith(prefix)) return ; // send by bot itself or invalid prefix

		const args = msg.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if(!client.commands.has(commandName)) return ; // invalid command

		const command = client.commands.get(commandName);
		
		try{
			command.execute(msg, args, client);
		}catch(err){
			console.log(err);
		}

	},
};