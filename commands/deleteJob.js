const jobModel = require("../models/schema");

module.exports = {
    name: "delete",
    description: "delete job",
    async execute(msg, args) {
		let job;
        let num = Number(args);

        if(!Number.isInteger(num)) {
            msg.reply("Invalid Id");
            return;
        } 

		job = await jobModel.findOne({serverId: msg.guild.id, jobId: num })
        if(!job) {
            msg.reply("Invalid Id");
            return;
        }

        job.deleteOne({});
        msg.reply(`Job ${job.jobName} has been deleted`);
    }
};