const jobModel = require("../models/schema");

module.exports = {
    name: "add",
    description: "add job",
    async execute(msg, args, client) {

        let name = args.join(" ");  // job name
        let job = await jobModel.find({serverId: msg.guild.id});
        let jobName = [];
        const author = msg.author.tag;

        for(let i=0 ; i<job.length ; i++){
            jobName.push(job[i].jobName);
        }
        if(jobName.includes(name)){
            msg.reply("This name has already used");
            return ;
        }

		if(typeof name !== "string" || name.length < 0){
			msg.reply("Invalid Job Name");
            return ;
		}

        msg.reply(`Please type date in this format: DD/MM/YYYY\nYou can type "cancel" to exit this command.`);
        client.commands.get("add2").execute(name, author, client);      
    }

};

