const jobModel = require("../models/schema");

module.exports = async function updateId(serverId){

    let job = await jobModel.find({serverId: serverId}).sort({"jobDeadline": 1}); // get sorted jobs

    for(let i=0 ; i<job.length ; i++){
        await jobModel.updateOne({serverId: serverId, jobName: job[i].jobName, jobDeadline: job[i].jobDeadline}, {$set: {jobId: i+1}});
    }

}