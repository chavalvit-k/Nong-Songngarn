const jobModel = require("../models/schema");

module.exports = async function updateId(serverId){

    let job = await jobModel.find({serverId: serverId}).sort({"jobDeadlineDay": 1}); // get sorted jobs

    for(let i=0 ; i<job.length ; i++){
        await jobModel.updateOne({serverId: serverId, jobName: job[i].jobName, jobDeadlineDay: job[i].jobDeadlineDay}, {$set: {jobId: i+1}});
    }

}