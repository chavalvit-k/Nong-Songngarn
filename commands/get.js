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

		if(msg.content === "cancel"){;
			msg.reply("You exit this command.");
			return ;
		}

		if(!["all", "day", "week"].includes(newArgs)){
			msg.reply(`Invalid argument. Please type day / week / all to get job lists`);
			return ;
		}
		
		if(newArgs === "all"){
			job = await jobModel.find({serverId: msg.guild.id}).sort({"jobDeadlineDay": 1});;
		}
		else if(newArgs === "day"){
			nextTime = now + 86400000 - (now % 86400000) - 25200001; // day: 86400000 7hrs+1ms: 25200001
			job = await jobModel.find({serverId: msg.guild.id, jobDeadlineDay: { $lte: nextTime }}).sort({"jobDeadlineDay": 1});;
		}
		else if(newArgs === "week"){
			nextTime = now + 604800000 - (now % 604800000) - 259200000  - 25200001; // week: 604800000 3days: 259200000 7hrs+1ms: 25200001
			job = await jobModel.find({serverId: msg.guild.id, jobDeadlineDay: { $lte: nextTime }}).sort({"jobDeadlineDay": 1});;
		}

		lists = `**Job lists**\n`;
		for(let i=0 ; i<job.length ; i++){
			let jobTime = parseDateString(new Date(job[i].jobDeadlineDay).toString());
			lists += `id: ${job[i].jobId}\nname: ${job[i].jobName}\ndeadline: ${jobTime}\n\n`;				
		}
		msg.reply(lists); 
		
    }
}
