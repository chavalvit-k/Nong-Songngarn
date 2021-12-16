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
        const notiTime = (await notificationModel.findOne({serverId: guild.id})).notificationTime;
        let time = now < notiTime ? notiTime - now : 86400000 - (now - notiTime);
        let notification = await notificationModel.findOne({serverId: guild.id});
        let notiSwitch;

        async function getJob(){
            let channel = guild.channels.cache.find(channel => channel.id === notification.channelId);
            console.log(channel.name);
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
                notiSwitch = notification.notificationSwitch;
                if(notiSwitch === true) {
                    getJob();
                    noti();
                }
            }, time);
        }

        setTimeout(() => {
            notiSwitch = notification.notificationSwitch;
            console.log(notiSwitch);
            if(notiSwitch === true) {
                getJob();
                time = 5000;
                noti(); 
            }
        }, time);  
          
    }
}