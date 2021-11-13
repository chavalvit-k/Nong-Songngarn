const jobModel = require("../models/schema");

module.exports = function updateId(serverId){

    let job = await jobModel.find({serverId: serverId}).sort({"jobDeadlineDay": 1}); // get sorted jobs

    for(let i=0 ; i<job.length ; i++){
        await jobModel.updateOne({serverId: serverId, jobId: job[i].jobId}, {$set: {jobId: i+1}});
    }

}