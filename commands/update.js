const jobModel = require("../models/schema");

module.exports = {
    name: "update",
    description: "update job",
    async execute(msg, args, client) {

        let id = args;
        id = Number(id);
        let job = await jobModel.findOne({jobId: id});
        
		if(!job || !id || id.length < 0){
			msg.reply("Invalid Job Id");
            return ;
		}

        msg.reply(`Type a number for select things to update.\n1. Name\n2. DeadlineDay\n3. DeadlineHour\n4. Name & DeadlineDay\n5. Name & DeadlineHour\n6. DeadlineDay & DeadlineHour\n7. Name & DeadlineDay & DeadlineHour\nYou can type "cancel" to exit this command.`);

        const author = msg.author.tag;
        client.commands.get("update2").execute(id, author, client);      
    }

};

