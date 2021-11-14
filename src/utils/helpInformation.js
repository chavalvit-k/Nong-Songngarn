const prefixModel = require("../models/prefix");

module.exports = async function (serverId){
   let serverPrefix = await prefixModel.find({serverId: serverId});
   const prefix = serverPrefix[0].prefix;
   return `You can use these 5 commands with this prefix "${prefix}"\n\n1. get: retrieve jobs data\nformat: get day / get week / get all\n\n2. add: add new job\nformat: add <job_name>\n\n3. update: update job by id\nformat: update <job_id>\n\n4. delete: delete job by id\nformat: delete <job_id>\n\n5. prefix: change prefix\nformat: prefix <new_prefix>`;
}