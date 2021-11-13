const jobModel = require("../models/schema");
const parseDateString = require("../utils/parseDateString");

module.exports = {
    name: "update_id",
    description: "update id sort by ascending after modify job",
    async execute(msg){
        let job;
        //await jobModel.find({serverId: msg.guild.id}) // sort
        job = await jobModel.find({serverId: msg.guild.id}).sort({"jobDeadlineDay": 1}); // get sort

           
        // job = await jobModel.find({serverId: msg.guild.id}).sort({"jobDeadlineDay": 1}); 
        // jobCounts = job.length;
        for(let i=0 ; i<job.length ; i++){
            //let idToChange = job[i].jobId;
            await jobModel.updateOne({serverId: msg.guild.id, jobId: job[i].jobId}, {$set: {jobId: i+1}});
        }
        // job = await jobModel.find({serverId: msg.guild.id});
        // for(let i=0 ; i<job.length ; i++){
        //     let jobTime = parseDateString(new Date(job[i].jobDeadlineDay).toString());
        //     console.log(`id: ${job[i].jobId}\nname: ${job[i].jobName}\ndeadline: ${jobTime}\n\n`);
        // }  
    }
}