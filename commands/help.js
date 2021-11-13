const { MessageEmbed } = require("discord.js");
const helpInformation = require("../utils/helpInformation");

module.exports = {
    name: "help",
    description: "help document",
    execute(msg){
        const embed = new MessageEmbed().setDescription(helpInformation);
        msg.reply({ embeds: [embed] });
    }
}