require("dotenv").config();
module.exports = {
	name: 'messageCreate',
	execute(msg) {
		const prefix = process.env.PREFIX;
    	if(msg.author.bot || !msg.content.startsWith(prefix)) return ; // send by bot itself or invalid prefix

		const args = msg.content.slice(prefix.length).trim().split(/ +/);
		const command = command.shift().toLowerCase();

		if(!client.commands.has(command)) return ; // invalid command

		if(command.length === 0) return ;

		try{
			command.execute(msg, args);
		}catch(err){
			console.log(err);
		}

	},
};