const { MessageEmbed } = require('discord.js');
const jobModel = require("../models/schema");

module.exports = {
    name: "update",
    description: "update job",
    async execute(msg, args, client) {
        const embed = new MessageEmbed().setColor("#add79b");
        if(msg.member.roles.cache.has("909049029734834226")) {
            let id = args;
            id = Number(id);
            let job = await jobModel.findOne({serverId: msg.guild.id, jobId: id});
            
            if(!job || !id || id.length < 0){
                embed.setDescription("Invalid Job Id");
                msg.reply({ embeds: [embed] });
                return ;
            }
    
            embed.setDescription(`Type a number for select things to update.\n1. Name\n2. DeadlineDay\n3. DeadlineHour\n4. Name & DeadlineDay\n5. Name & DeadlineHour\n6. DeadlineDay & DeadlineHour\n7. Name & DeadlineDay & DeadlineHour\nYou can type "cancel" to exit this command.`);
            msg.reply({ embeds: [embed] });
    
            const author = msg.author.tag;
            client.commands.get("update_chain_2").execute(id, author, client); 
        } else {
            embed.setDescription("You can't send this command because you don't have the right permissions");
            msg.reply({ embeds: [embed] });
        }
    }
};

