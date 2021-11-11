const jobModel = require("../models/schema");

module.exports = {
    name: "get",
    description: "get job",
    async execute(msg, args) {
		let jobData;
		try {
			jobData = await jobModel.findOne({ jobName: args });
			//console.log(jobData);
		}catch(err){
			console.log(err);
		}
        if(!jobData) msg.channel.send("Invalid data. Please type valid ");
        else msg.reply(`${jobData.jobId} ${jobData.serverId} ${jobData.jobName} ${jobData.jobDeadlineDay}`);
    }
}
