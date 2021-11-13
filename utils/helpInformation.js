require("dotenv").config();

module.exports = `You can use these 4 commands with this prefix "${process.env.PREFIX}"\n\n1. get: retrieve jobs data\nformat: get day / get week / get all\n\n2. add: add job\nformat: add <job_name>\n\n3. update: update job\nformat: update <job_id>\n\n4. delete: delete job\nformat: delete <job_id>`;