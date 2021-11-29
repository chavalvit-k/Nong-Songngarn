const { MessageEmbed } = require('discord.js');
const jobModel = require("../models/schema");
const parseDateString = require('../utils/parseDateString');
const updateId = require('../utils/updateId');

module.exports = {
    name: "delete",
    description: "delete job",
    async execute(msg, args) {

        const embed = new MessageEmbed().setColor("#add79b");

        if(!msg.member.roles.cache.some(role => role.name === "แอดมิน น้องส่งงาน") && msg.author.id !== msg.guild.ownerId){
            embed.setDescription(`You can't access this command\nBecause you aren't server owner or you don't have "แอดมิน น้องส่งงาน" role`);
            msg.reply({ embeds: [embed] });
            return ;
        }

        let job;
        let num = Number(args);

        if(!Number.isInteger(num)) {
            embed.setDescription("Invalid Id");
            msg.reply({ embeds: [embed] });
            return;
        } 

        job = await jobModel.findOne({serverId: msg.guild.id, jobId: num })
        if(!job) {
            embed.setDescription("Invalid Id");
            msg.reply({ embeds: [embed] });
            return;
        }

        let jobTime = parseDateString(new Date(job.jobDeadline).toString());
        await job.deleteOne({});          
        embed.setDescription(`**Delete job completed!**\n\nName: ${job.jobName}\nDeadline: ${jobTime}`);
        msg.reply({ embeds: [embed] });

        updateId(msg.guild.id);
      
    }
};