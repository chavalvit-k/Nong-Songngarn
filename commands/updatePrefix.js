const { MessageEmbed } = require("discord.js");
const prefixModel = require("../models/prefix");

module.exports = {
    name: "prefix",
    description: "update prefix",
    async execute(msg, args){

        const embed = new MessageEmbed().setColor("#add79b");

        if(!msg.member.roles.cache.some(role => role.name === "แอดมิน น้องส่งงาน") && msg.author.id !== msg.guild.ownerId){
            embed.setDescription(`You can't access this command because you are't server owner or you don't have "แอดมิน น้องส่งงาน" role`);
            msg.reply({ embeds: [embed] });
            return ;
        }

        if(args.length != 1){
            embed.setDescription("Invalid new prefix length.\nMust contain only 1 special character.");
            msg.reply({ embeds: [embed] });
            return ;
        }

        newPrefix = args[0];
        const code = newPrefix.charCodeAt(0);

        if(newPrefix.length !== 1 || Number.isInteger(Number(newPrefix)) || (code >= 65 && code <= 90 || code >= 97 && code <= 122)){
            embed.setDescription("Invalid new prefix length.\nMust contain only 1 special character.");
            msg.reply({ embeds: [embed] });
            return ;
        }

        await prefixModel.updateOne({serverId: msg.guild.id}, {$set: {prefix: newPrefix}});

        embed.setDescription(`Update completed!\nChange prefix to "${newPrefix}"`);
        msg.reply({ embeds: [embed] });
         
    }
}