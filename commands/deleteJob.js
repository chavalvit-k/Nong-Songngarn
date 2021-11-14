const { MessageEmbed } = require('discord.js');
const jobModel = require("../models/schema");
const updateId = require('../utils/updateId');

module.exports = {
    name: "delete",
    description: "delete job",
    async execute(msg, args) {
        const embed = new MessageEmbed().setColor("#add79b");
        if(msg.member.roles.cache.has("909049029734834226")) {
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

            await job.deleteOne({});
            embed.setDescription(`Job ${job.jobName} has been deleted`);
            msg.reply({ embeds: [embed] });

            updateId(msg.guild.id);
        } 
        else {
            embed.setDescription("You can't send this command because you don't have the right permissions");
            msg.reply({ embeds: [embed] });
        }
    }
};