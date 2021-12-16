const { MessageEmbed } = require("discord.js");
const notificationModel = require("../models/notification");

module.exports = {
    name: "noti",
    description: "turn on/off notification",
    async execute(msg, args, client){

        const embed = new MessageEmbed().setColor("#add79b");

        console.log(args);
        if(args[0] === "on"){
            await notificationModel.updateOne({serverId: msg.guild.id}, {$set: {notificationSwitch: true}});
            client.commands.get("_notification").execute(msg.guild, client);   
            embed.setDescription(`Notification **ON**`);
        	msg.reply({ embeds: [embed] });
			return ;
        }

        else if(args[0] === "off"){
            await notificationModel.updateOne({serverId: msg.guild.id}, {$set: {notificationSwitch: false}});
            embed.setDescription(`Notification **OFF**`);
        	msg.reply({ embeds: [embed] });
			return ;
        }   

        else{
            embed.setDescription(`Invalid argument.\n\nPlease type on / off to turn on/off notification`);
        	msg.reply({ embeds: [embed] });
			return ;
        }     
    }
}