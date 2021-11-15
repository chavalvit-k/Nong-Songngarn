const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "update_chain_2",
    description: "chain command from update.js",
    execute(id, author, client) {
        client.once("messageCreate", async (msg) => {
            const embed = new MessageEmbed().setColor("#add79b");
            // message did not send by command initiator
            if(msg.author.tag !== author){
                client.commands.get("update_chain_2").execute(id, author, client);
                return ;
            }

            // user use another command
            if(msg.content.includes("-")) return ;

            if(msg.content === "cancel") {
                embed.setDescription("You exit this command.");
                msg.reply({ embeds: [embed] });
                return ;
            }
            
            let num = Number(msg.content);  
            if(!Number.isInteger(num) || num<1 || num>7){
                embed.setDescription("Invalid Job Id");
                msg.reply({ embeds: [embed] });
                client.commands.get("update_chain_2").execute(id, author, client);
                return ;
            }

            const info = `\n\nYou can type "cancel" to exit this command.`;

            if(num === 1) {
                embed.setDescription(`Type data in this format: <name> ${info}`);
                msg.reply({ embeds: [embed] });
            }
            else if(num === 2) {
                embed.setDescription(`Type data in this format: <deadline_day> ${info}`);
                msg.reply({ embeds: [embed] });
            }
            else if(num === 3) {
                embed.setDescription(`Type data in this format: <deadline_hour> ${info}`);
                msg.reply({ embeds: [embed] });
            }
            else if(num === 4) {
                embed.setDescription(`Type data in this format: <name>,<deadline_day> ${info}`);
                msg.reply({ embeds: [embed] });
            }
            else if(num === 5) {
                embed.setDescription(`Type data in this format: <name>,<deadline_hour> ${info}`);
                msg.reply({ embeds: [embed] });
            }
            else if(num === 6) {
                embed.setDescription(`Type data in this format: <deadline_day>,<deadline_hour> ${info}`);
                msg.reply({ embeds: [embed] });
            }
            else if(num === 7) {
                embed.setDescription(`Type data in this format: <name>,<deadline_day>,<deadline_hour> ${info}`);
                msg.reply({ embeds: [embed] });
            }
            
            client.commands.get("update_chain_3").execute(id, num, author, client);

        })
    }
};
