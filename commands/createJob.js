const jobModel = require("../models/schema");

module.exports = {
    name: "add",
    description: "add job",
    async execute(guild, args, client) {
        let name = args.join(" ");  // job name
		if(typeof name != "string" || name.length < 0){
			msg.reply("Invalid job name");
            return ;
		}
        
        client.on("messageCreate", async (msg) => {
            let deadlineString = msg.content;
            let deadlineParts;

            if(deadlineString.includes("/")) deadlineParts = deadlineString.split("/");               //
            else if(deadlineString.includes("-")) deadlineParts = deadlineString.split("-");          //  change format from dd/mm/yyyy to yyyy/mm/dd
            let deadlineDate = new Date(+deadlineParts[2], deadlineParts[1] - 1, +deadlineParts[0]);  //

            let latestId = (await jobModel.find().sort({"_id": -1}).limit(1)); // get latest id

            if(latestId.length === 0) latestId = 0;
            else latestId = latestId[0].jobId;

            let job = await jobModel.create({
                jobId: latestId + 1,
                serverId: guild.id,
                jobName: name,
                jobDeadlineDay: deadlineDate,
            })
            job.save();
            msg.reply(`Create job ${job.jobName} completed deadline on ${job.jobDeadlineDay}.`);
        })
    }
};