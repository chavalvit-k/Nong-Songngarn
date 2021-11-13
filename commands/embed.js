const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "embed",
    description: "test embed",
    execute(msg, client){
        const embed = new MessageEmbed().setColor("#add79b");
        if(msg.content === "something"){
            embed.setDescription("Tong Auan!");
        }

        msg.reply({ embeds: [embed] });
    }
}