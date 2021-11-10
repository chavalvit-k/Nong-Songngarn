const jobModel = require("../models/schema");

module.exports = {
    name: "ดูงาน",
    description: "get job",
    async execute(msg, args) {
		let jobData;
		try {
			jobData = await jobModel.findOne({ jobName: args })
			//console.log(jobData);
		}catch(err){
			console.log(err);
		}
        if(!jobData) msg.channel.send("invalid data ไอ้โง่");
        msg.reply(`${jobData._id} ${jobData.jobId} ${jobData.jobName} ${jobData.jobDeadlineDay}`);
    }
}
