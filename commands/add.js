module.exports = {
    name: "add",
    description: "add job",
    execute(msg, args, client) {
        let name = args.join(" ");  // job name

		if(typeof name !== "string" || name.length < 0){
			msg.reply("Invalid Job Name");
            return ;
		}
        const author = msg.author.tag;

        msg.reply(`Please type date in this format: DD/MM/YYYY\nYou can type "cancel" to exit this command.`);
        client.commands.get("add2").execute(name, author, client);      
    }

};

