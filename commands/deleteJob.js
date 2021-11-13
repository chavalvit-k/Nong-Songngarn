const { MessageEmbed } = require('discord.js');
const jobModel = require("../models/schema");
const updateId = require('../utils/updateId');

module.exports = {
    name: "delete",
    description: "delete job",
    async execute(msg, args) {
        const embed = new MessageEmbed().setColor("#add79b");
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
};