const { MessageEmbed } = require("discord.js");
const notificationModel = require("../models/notification");

module.exports = {
    name: "channel",
    description: "change notification channel",
    async execute(msg, args, client){

        const embed = new MessageEmbed().setColor("#add79b");

        let channel = msg.guild.channels.cache.find(channel => channel.name === args[0]);
        if(channel === undefined || channel.type !== 'GUILD_TEXT'){ 
            embed.setDescription(`Invalid channel name`);
            msg.reply({ embeds: [embed] });
            return;
        } 

        await notificationModel.updateOne({serverId: msg.guild.id}, {$set: {channelId: channel.id}});
        embed.setDescription(`**Update completed!**\n\nChange notification channel to "${channel.name}"`);
        msg.reply({ embeds: [embed] });

    }
}