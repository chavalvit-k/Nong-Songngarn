const { MessageEmbed } = require('discord.js');
const jobModel = require("../models/schema");
const parseDateString = require("../utils/parseDateString");

module.exports = {
    name: "get",
    description: "get job",
    async execute(msg, args, client) {
		const embed = new MessageEmbed().setColor("#add79b");
		let job;
		let now = new Date().getTime();
		let nextTime;
		let newArgs = args[0];

		if(msg.content === "cancel") {
			embed.setDescription("You exit this command.");
        	msg.reply({ embeds: [embed] });
			return ;
		}

		if(!["all", "day", "week"].includes(newArgs)){
			embed.setDescription(`Invalid argument.\nPlease type day / week / all to get job lists`);
        	msg.reply({ embeds: [embed] });
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
			if(now % 604800000 <= 345600000) nextTime = now + 1209600000 - (now % 604800000) - 259200000  - 25200001; // 2week: 604800000 3days: 259200000 7hrs+1ms: 25200001
			else nextTime = now + 604800000 - (now % 604800000) - 259200000  - 25200001; // week: 604800000 3days: 259200000 7hrs+1ms: 25200001
			job = await jobModel.find({serverId: msg.guild.id, jobDeadlineDay: { $lte: nextTime }}).sort({"jobDeadlineDay": 1});;
		}

		lists = `**Job lists**\n\n`;
		for(let i=0 ; i<job.length ; i++){
			let jobTime = parseDateString(new Date(job[i].jobDeadlineDay).toString());
			lists += `id: ${job[i].jobId}\nName: ${job[i].jobName}\nDeadline: ${jobTime}\n\n`;				
		}
		embed.setDescription(lists);
        msg.reply({ embeds: [embed] });
		
    }
}
