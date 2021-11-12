const jobModel = require("../models/schema");
const parseDateString = require("../utils/parseDateString");

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

            if(msg.content === "cancel"){;
                msg.reply("You exit this command.");
                return ;
            }

            let data = msg.content;
            data = data.split(" ");

            async function name(name) {
                await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobName: name}});
            }
            
            async function date(day, hour) {
                if(day.includes("/")) day = day.split("/");               
                else if(day.includes("-")) day = day.split("-");

                let dayFormated = `${day[2]} ${day[1]} ${day[0]}`; 
                let deadlineDate = new Date(dayFormated); 

                if(deadlineDate.toString() === "Invalid Date"){
                    msg.reply(`Invalid date. Please type date in this format: DD/MM/YYYY\nYou can type "cancel" to exit this command.`);
                    client.commands.get("update3").execute(id, num, author, client);
                    return ;
                }
                
                hour = Number(hour);
                if(hour){
                    if(!Number.isInteger(hour) || hour < 1 || hour > 23){
                        msg.reply(`Invalid hour. Please type hour in 1-23 range\nYou can type "cancel" to exit this command.`)
                        client.commands.get("update3").execute(id, num, author, client);
                        return ;
                    }
                    deadlineDate.setHours(hour);  
                }
                await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadlineDay: deadlineDate.getTime()}});
            }

            switch(num) {
                case 1:
                    name(data[0]);
                    break;
                case 2:
                    date(data[0], 0);
                    break;
                case 3:
                    date(0, data[0]);
                    break;
                case 4:
                    name(data[0]), date(data[1], 0);
                    break;
                case 5:
                    name(data[0]), date(0, data[1]);
                    break;
                case 6:
                    date(data[0], data[1]);
                    break;
                case 7:
                    name(data[0]), date(data[1], data[2]);
                    break;
          
            } 
            let job = await jobModel.findOne({serverId: msg.guild.id, jobId: id});
            let jobTime = parseDateString(new Date(job.jobDeadlineDay).toString());
            msg.reply(`Update job completed!\nName: ${job.jobName}\nDeadline: ${jobTime}`);  
        })
    }
}