const { MessageEmbed } = require("discord.js");
const helpInformation = require("../utils/helpInformation");

module.exports = {
    name: "help",
    description: "help document",
    execute(msg){
        const embed = new MessageEmbed().setColor("#add79b").setDescription(helpInformation);
        msg.reply({ embeds: [embed] });
    }
}