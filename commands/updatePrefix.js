const { MessageEmbed } = require("discord.js");
const prefixModel = require("../models/prefix");

module.exports = {
    name: "prefix",
    description: "update prefix",
    async execute(msg, args){
        const embed = new MessageEmbed().setColor("#add79b");
        if(msg.member.roles.cache.has("909049029734834226")) {
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
            // let serverPrefix = prefixModel.findOne({serverId: msg.guild.id});
            // console.log(serverPrefix);
            // const prefix = serverPrefix.prefix;

            embed.setDescription(`Update completed!\nChange prefix to "${newPrefix}"`);
            msg.reply({ embeds: [embed] });
        } 
        else {
            embed.setDescription("You can't send this command because you don't have the right permissions");
            msg.reply({ embeds: [embed] });
        }
    }
}