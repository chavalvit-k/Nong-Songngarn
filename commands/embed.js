const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "embed",
    description: "test embed",
    execute(msg, client){
        const exampleEmbed = new MessageEmbed();
        if(msg.content === "something"){
            exampleEmbed.setDescription("Tong Auan!");
        }

        msg.reply({ embeds: [exampleEmbed] });
    }
}