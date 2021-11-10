const jobModel = require("../models/schema");

module.exports = {
    name: "delete",
    description: "delete job",
    async execute(msg, args) {
		let jobData;
		try {
			jobData = await jobModel.findOne({ jobId: args })
			//console.log(jobData);
		}catch(err){
			console.log(err);
		}
        if(!jobData || args.length != 1) {
            msg.reply("Invalid Id");
            return;
        } 
        jobData.deleteOne({});
        msg.reply(`Job ${jobData.jobName} has been deleted`);
    }
};