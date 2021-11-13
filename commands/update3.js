const jobModel = require("../models/schema");
const parseDateString = require("../utils/parseDateString");
const updateId = require("../utils/updateId");

module.exports = {
    name: "update3",
    description: "chain command from update2.js",
    execute(id, num, author, client){
        client.once("messageCreate", async (msg) => {

            // message did not send by command initiator
            if(msg.author.tag !== author){
                client.commands.get("update3").execute(id, num, author, client);
                return ;
            }

            // user use another command
            if(msg.content.includes("-")) return ;

            if(msg.content === "cancel"){;
                msg.reply("You exit this command.");
                return ;
            }

            let data = msg.content;
            data = data.split(",");
            if(data.length - 1 !== Math.floor((num-1)/3)) {
                msg.reply(`Invalid format.\nYou can type "cancel" to exit this command.`);
                client.commands.get("update3").execute(id, num, author, client);
                return ;
            }

            let check = 1;
            function name(name) {
                name = Number(name);
                if(Number.isInteger(name)) {
                    msg.reply(`Invalid name. Name must contain at least 1 character.\nYou can type "cancel" to exit this command.`);
                    client.commands.get("update3").execute(id, num, author, client);
                    check = 0;
                    return ;
                }
            }
            
            let dayFormated,  deadlineDate;
            function date(day, hour) {
                if(day.includes("/")) day = day.split("/");               
                else if(day.includes("-")) day = day.split("-");

                dayFormated = `${day[2]} ${day[1]} ${day[0]}`; 
                deadlineDate = new Date(dayFormated); 

                if(deadlineDate.toString() === "Invalid Date"){
                    msg.reply(`Invalid date. Please type date in this format: DD/MM/YYYY\nYou can type "cancel" to exit this command.`);
                    client.commands.get("update3").execute(id, num, author, client);
                    check = 0;
                    return ;
                }
                
                hour = Number(hour);
                if(hour){
                    if(!Number.isInteger(hour) || hour < 1 || hour > 23){
                        msg.reply(`Invalid hour. Please type hour in 1-23 range\nYou can type "cancel" to exit this command.`)
                        client.commands.get("update3").execute(id, num, author, client);
                        check = 0;
                        return ;
                    }
                    deadlineDate.setHours(hour);  
                }
            }

            switch(num) {
                case 1:
                    name(data[0]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobName: name}});
                    }
                    break;
                case 2:
                    date(data[0], 0);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadlineDay: deadlineDate.getTime()}});
                    }
                    break;
                case 3:
                    date(0, data[0]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadlineDay: deadlineDate.getTime()}});
                    }
                    break;
                case 4:
                    name(data[0]), date(data[1], 0);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobName: name}});
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadlineDay: deadlineDate.getTime()}});
                    }
                    break;
                case 5:
                    name(data[0]), date(0, data[1]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobName: name}});
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadlineDay: deadlineDate.getTime()}});
                    }
                    break;
                case 6:
                    date(data[0], data[1]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadlineDay: deadlineDate.getTime()}});
                    }
                    break;
                case 7:
                    name(data[0]), date(data[1], data[2]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobName: name}});
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadlineDay: deadlineDate.getTime()}});
                    }
                    break;
          
            } 
            if(check) {
                let job = await jobModel.findOne({serverId: msg.guild.id, jobId: id});
                let jobTime = parseDateString(new Date(job.jobDeadlineDay).toString());
                msg.reply(`Update job completed!\nName: ${job.jobName}\nDeadline: ${jobTime}`);
            }
            
        updateId(msg.guild.id);
        })
    }
}