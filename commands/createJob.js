const jobModel = require("../models/schema");

module.exports = {
    name: "เพิ่มงาน",
    description: "add job",
    async execute(msg, guild, client) {
        let job = await jobModel.create({
            serverId: guild.id,
            jobId: 1,
            jobName: "job",
            jobDeadlineDay: 1,
        })
        job.save();
    }
};