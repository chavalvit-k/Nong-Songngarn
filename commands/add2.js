const { MessageEmbed } = require('discord.js');
const jobModel = require("../models/schema");
const parseDateString = require("../utils/parseDateString");
const updateId = require("../utils/updateId");

module.exports = {
    name: "add_chain_2",
    description: "chain command from add.js",
    execute(name, author, client){
        client.once("messageCreate", async (msg) => {
            const embed = new MessageEmbed().setColor("#add79b");

            // message did not send by command initiator
            if(msg.author.tag !== author){
                client.commands.get("add_chain_2").execute(name, author, client);
                return ;
            }
            
            // user use another command
            if(msg.content.includes("-")) return ;

            if(msg.content === "cancel") {
                embed.setDescription("You exit this command.");
                msg.reply({ embeds: [embed] });
                return ;
            }
         
            let deadline = msg.content;
            deadline = deadline.split(" ");
            let day = deadline[0]; 
            let hour = Number(deadline[1]); // optional
        
            if(day.includes("/")) day = day.split("/");               
            else if(day.includes("-")) day = day.split("-");

            //  change format from dd/mm/yyyy to yyyy/mm/dd
            let dayFormated = `${day[2]} ${day[1]} ${day[0]}`; 
            let deadlineDate = new Date(dayFormated); 

            if(deadlineDate.toString() === "Invalid Date"){
                embed.setDescription(`Invalid date. Please type date in this format: DD/MM/YYYY\nYou can type "cancel" to exit this command.`);
                msg.reply({ embeds: [embed] });
                client.commands.get("add_chain_2").execute(name, author, client);
                return ;
            }

            if(hour){
                if(!Number.isInteger(hour) || hour < 1 || hour > 23){
                    embed.setDescription(`Invalid hour. Please type hour in 1-23 range\nYou can type "cancel" to exit this command.`);
                    msg.reply({ embeds: [embed] });
                    client.commands.get("add_chain_2").execute(name, author, client);
                    return ;
                }
                deadlineDate.setHours(hour);  
            }

            let latestId = await jobModel.find({serverId: msg.guild.id}).sort({"_id": -1}).limit(1); 

            if(latestId.length === 0) latestId = 0;
            else latestId = latestId[0].jobId;

            let job = await jobModel.create({
                jobId: latestId + 1,
                serverId: msg.guild.id,
                jobName: name,
                jobDeadlineDay: deadlineDate.getTime()
            })

            job.save();
            let jobTime = parseDateString(new Date(job.jobDeadlineDay).toString());
            embed.setDescription(`Create job completed!\nName: ${job.jobName}\nDeadline: ${jobTime}`);
            msg.reply({ embeds: [embed] });

            updateId(msg.guild.id);    
        })

    }
}