const jobModel = require("../models/schema");
const parseDateString = require("../utils/parseDateString");

module.exports = {
    name: "get",
    description: "get job",
    async execute(msg, args, client) {
		let job;
		let now = new Date().getTime();
		let nextTime;
		let newArgs = args[0];
		const author = msg.author.tag;

		if(msg.content === "cancel"){;
			msg.reply("You exit this command.");
			return ;
		}

		if(!["all", "day", "week"].includes(newArgs)){
			msg.reply(`Invalid argument. Please type day / week / all to get job lists`);
			return ;
		}
		
		if(newArgs === "all"){
			job = await jobModel.find({});
		}
		else if(newArgs === "day"){
			nextTime = now + 86400000;
			job = await jobModel.find({jobDeadlineDay: { $lte: nextTime }});
		}
		else if(newArgs === "week"){
			nextTime = now + 604800000;
			job = await jobModel.find({jobDeadlineDay: { $lte: nextTime }});
		}

		lists = `**Job lists**\n`;
		for(let i=0 ; i<job.length ; i++){
			let jobTime = parseDateString(new Date(job[i].jobDeadlineDay).toString());
			lists += `id: ${job[i].jobId}\nname: ${job[i].jobName}\ndeadline: ${jobTime}\n\n`;				
		}
		msg.reply(lists); 
		
    }
}
