const jobModel = require("../models/schema");

module.exports = {
    name: "เพิ่มงาน",
    description: "add job",
    async execute(guild, msg, client) {
        let job = await jobModel.create({
            serverId: guild.id,
            jobId: 20000,
            jobName: "job",
            jobDeadlineDay: 1,
        })
        job.save();
        //msg.reply(`Create job: ${job.jobName} completed deadline on ${job.jobDeadlineDay}.`);
    }
};