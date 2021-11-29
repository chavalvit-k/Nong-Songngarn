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

            if(msg.author.tag !== author){
                client.commands.get("add_chain_2").execute(name, author, client);
                return ;
            }

            if(msg.content.includes("-")) return ;

            if(msg.content === "cancel") {
                embed.setDescription("You exit this command.");
                msg.reply({ embeds: [embed] });
                return ;
            }
         
            let deadline = msg.content;
            deadline = deadline.split(" ");

            let day = deadline[0]; 
            day = day.split("/"); 

            let hour = Number(deadline[1]); // optional

            //  change format from dd/mm/yyyy to yyyy/mm/dd
            let dayFormated = `${day[2]} ${day[1]} ${day[0]}`; 
            let deadlineDate = new Date(dayFormated); 

            if(deadlineDate.toString() === "Invalid Date"){
                embed.setDescription(`Invalid date.\n\nPlease type date in this format: <dd/mm/yyyy> <hour>\n**<hour> is optional\n\nYou can type "cancel" to exit this command.`);
                msg.reply({ embeds: [embed] });
                client.commands.get("add_chain_2").execute(name, author, client);
                return ;
            }

            if(hour){
                if(!Number.isInteger(hour) || hour < 1 || hour > 23){
                    embed.setDescription(`Invalid hour.\n\nPlease type hour in 1-23 range\n\nYou can type "cancel" to exit this command.`);
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
                jobDeadline: deadlineDate.getTime()
            })
            job.save();

            let jobTime = parseDateString(new Date(job.jobDeadline).toString());
           
            embed.setDescription(`**Create job completed!**\n\nName: ${job.jobName}\nDeadline: ${jobTime}`);
            msg.reply({ embeds: [embed] });

            updateId(msg.guild.id);    

        })

    }
}