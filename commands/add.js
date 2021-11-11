const jobModel = require("../models/schema");

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
        // console.log(author);
        client.commands.get("add2").execute(name, author, client);      
    }

};

