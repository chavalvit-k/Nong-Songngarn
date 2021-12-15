const jobModel = require("../models/schema");
const notificationModel = require("../models/notification");
const { MessageEmbed } = require('discord.js');
const parseDateString = require("../utils/parseDateString");

module.exports = {
    name: "_notification",
    description: "notification",
    async execute(guild, client){

        const embed = new MessageEmbed().setColor("#add79b");

        const now = new Date().getTime();
        const notiTime = (await notificationModel.find({serverId: guild.id}))[0].notificationTime;
        let time = now < notiTime ? notiTime - now : 86400000 - (now - notiTime);
        const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT');

        async function getJob(){
            let nextTime = now + 86400000 - (now % 86400000) - 25200001;
            let job = await jobModel.find({serverId: guild.id, jobDeadline: { $lte: nextTime }}).sort({"jobDeadline": 1});
            let lists = `**Job lists**\n\n`;

		    for(let i=0 ; i<job.length ; i++){
			    let jobTime = parseDateString(new Date(job[i].jobDeadline).toString());
			    lists += `id: ${job[i].jobId}\nName: ${job[i].jobName}\nDeadline: ${jobTime}\n\n`;				
		    }

            if(job.length === 0){
                lists = `**No job has to send today!**`;
            }

            channel.send("@everyone");
            embed.setDescription(lists);
            channel.send({ embeds: [embed] });
        }

        async function noti(){             
            setTimeout(() => {
                getJob();
                noti();
            }, time);
        }

        setTimeout(() => {
            getJob();
            time = 86400000;
            noti(); 
        }, time);  
          
    }
}