const { MessageEmbed } = require('discord.js');
const jobModel = require("../models/schema");
const msToDate = require('../utils/msToDate');
const parseDateString = require("../utils/parseDateString");
const updateId = require("../utils/updateId");

module.exports = {
    name: "update_chain_3",
    description: "chain command from update2.js",
    execute(id, num, author, client){

        client.once("messageCreate", async (msg) => {

            const embed = new MessageEmbed().setColor("#add79b");
            
            if(msg.author.tag !== author){
                client.commands.get("update_chain_3").execute(id, num, author, client);
                return ;
            }

            if(msg.content.includes("-")) return ;

            if(msg.content === "cancel") {
                embed.setDescription("You exit this command.");
                msg.reply({ embeds: [embed] });
                return ;
            }

            let data = msg.content;
            data = data.split(",");

            if(data.length - 1 !== Math.floor((num-1)/3)) {
                embed.setDescription(`Invalid format.\n\nYou can type "cancel" to exit this command.`);
                msg.reply({ embeds: [embed] });
                client.commands.get("update_chain_3").execute(id, num, author, client);
                return ;
            }

            let check = 1;
            let newName;

            function name(name) {
                newName = name;
                name = Number(name);
                if(Number.isInteger(name)) {
                    embed.setDescription(`Invalid name.\n\nName must contain at least 1 character.\n\nYou can type "cancel" to exit this command.`);
                    msg.reply({ embeds: [embed] });
                    client.commands.get("update_chain_3").execute(id, num, author, client);
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
                    embed.setDescription(`Invalid date.\n\nPlease type date in this format: <dd/mm/yyyy> <hour>\n**<hour> is optional\n\nYou can type "cancel" to exit this command.`);
                    msg.reply({ embeds: [embed] });
                    client.commands.get("update_chain_3").execute(id, num, author, client);
                    check = 0;
                    return ;
                }
                
                hour = Number(hour);
                if(hour){
                    if(!Number.isInteger(hour) || hour < 1 || hour > 23){
                        embed.setDescription(`Invalid hour.\n\nPlease type hour in 1-23 range\n\nYou can type "cancel" to exit this command.`);
                        msg.reply({ embeds: [embed] });
                        client.commands.get("update_chain_3").execute(id, num, author, client);
                        check = 0;
                        return ;
                    }
                    deadlineDate.setHours(hour);  
                }
            }

            let job = await jobModel.findOne({serverId: msg.guild.id, jobId: id});
            let day = msToDate(job.jobDeadline);

            switch(num) {
                case 1:
                    name(data[0]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobName: newName}});
                    }
                    break;
                case 2:
                    date(data[0], 0);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadline: deadlineDate.getTime()}});
                    }
                    break;
                case 3:
                    date(day, data[0]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadline: deadlineDate.getTime()}});
                    }
                    break;
                case 4:
                    name(data[0]), date(data[1], 0);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobName: newName}});
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadline: deadlineDate.getTime()}});
                    }
                    break;
                case 5:
                    name(data[0]), date(day, data[1]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobName: newName}});
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadline: deadlineDate.getTime()}});
                    }
                    break;
                case 6:
                    date(data[0], data[1]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadline: deadlineDate.getTime()}});
                    }
                    break;
                case 7:
                    name(data[0]), date(data[1], data[2]);
                    if(check) {
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobName: newName}});
                        await jobModel.updateOne({serverId: msg.guild.id, jobId: id}, {$set: {jobDeadline: deadlineDate.getTime()}});
                    }
                    break;
          
            }

            if(check) {
                job = await jobModel.findOne({serverId: msg.guild.id, jobId: id});
                let jobTime = parseDateString(new Date(job.jobDeadline).toString());
                embed.setDescription(`**Update job completed!**\n\nName: ${job.jobName}\nDeadline: ${jobTime}`);
                msg.reply({ embeds: [embed] });
            }
            
        updateId(msg.guild.id);
        
        })

    }
}