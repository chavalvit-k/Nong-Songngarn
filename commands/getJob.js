const jobModel = require("../models/schema");

module.exports = {
    name: "get",
    description: "get job",
    async execute(msg, args) {
		let job;
		job = await jobModel.find({});
        if(!job) msg.reply.send("Invalid data. Please type valid ");
		else{
			lists = "**Job lists**\n";
			for(let i=0 ; i<job.length ; i++){
				lists += `id: ${job[i].jobId}\nname: ${job[i].jobName}\ndeadline: ${job[i].jobDeadlineDay}\n\n`;				
			}
			msg.reply(lists);
		}
    }
}
