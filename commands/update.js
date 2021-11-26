const { MessageEmbed } = require('discord.js');
const jobModel = require("../models/schema");

module.exports = {
    name: "update",
    description: "update job",
    async execute(msg, args, client) {

        const embed = new MessageEmbed().setColor("#add79b");

        if(!msg.member.roles.cache.some(role => role.name === "แอดมิน น้องส่งงาน") && msg.author.id !== msg.guild.ownerId){
            embed.setDescription(`You can't access this command because you are't server owner or you don't have "แอดมิน น้องส่งงาน" role`);
            msg.reply({ embeds: [embed] });
            return ;
        }

        let id = Number(args);
        let job = await jobModel.findOne({serverId: msg.guild.id, jobId: id});
            
        if(!job || !id || id.length < 0){
            embed.setDescription("Invalid Job Id");
            msg.reply({ embeds: [embed] });
            return ;
        }
    
        embed.setDescription(`Type a number to select update format.\n\n1. name\n2. deadline_day\n3. deadline_hour\n4. name / deadline_day\n5. name / deadline_hour\n6. deadline_day / deadline_hour\n7. name / deadline_day / deadline_hour\n\nYou can type "cancel" to exit this command.`);
        msg.reply({ embeds: [embed] });
    
        const author = msg.author.tag;
        client.commands.get("update_chain_2").execute(id, author, client); 

    }
};

