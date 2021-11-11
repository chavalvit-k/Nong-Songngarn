const jobModel = require("../models/schema");

module.exports = {
    name: "delete",
    description: "delete job",
    async execute(msg, args) {
		let job;
		job = await jobModel.findOne({ jobId: args })
        if(!job || args.length != 1) {
            msg.reply("Invalid Id");
            return;
        } 
        job.deleteOne({});
        msg.reply(`Job ${job.jobName} has been deleted`);
    }
};