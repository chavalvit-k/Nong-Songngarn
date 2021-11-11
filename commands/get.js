const jobModel = require("../models/schema");
const parseDateString = require("../utils/parseDateString");

module.exports = {
    name: "get",
    description: "get job",
    async execute(msg, args, client) {
		let job;
		let now = new Date();
		let nextTime;
		let nextDate;
		let newArgs = args[0];

		console.log(newArgs);

		if(msg.content === "cancel"){;
			msg.reply("You exit this command.");
			return ;
		}
		if(!["all", "day", "week"].includes(newArgs)){
			msg.reply(`Please type day / week / all to get job lists\nYou can type "cancel" to exit this command.`);
			client.once("messageCreate", (msg) => {
				args = msg.content;
				client.commands.get("get").execute(msg, args, client);
			})
			return ;
		}
		
		if(newArgs === "all"){
			job = await jobModel.find({});
		}
		else if(newArgs === "day"){
			nextTime = now.getTime() + 86400000;
			nextDate = new Date(nextTime);
			job = await jobModel.find({jobDeadlineDay: { $gte: nextDate }});
		}
		else if(newArgs === "week"){
			nextTime = now.getTime() + 604800000;
			nextDate = new Date(nextTime);
			job = await jobModel.find({jobDeadlineDay: { $gte: nextDate }});
		}

		console.log(job);

		lists = "**Job lists**\n";
		for(let i=0 ; i<job.length ; i++){
			let jobTime = parseDateString(job[i].jobDeadlineDay);
			lists += `id: ${job[i].jobId}\nname: ${job[i].jobName}\ndeadline: ${jobTime}\n\n`;				
		}
		msg.reply(lists);
		
    }
}
