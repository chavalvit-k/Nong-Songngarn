const { MessageEmbed } = require("discord.js");
const helpInformation = require("../utils/helpInformation");

module.exports = {
    name: "help",
    description: "help document",
    execute(msg){
        const help = helpInformation(msg.guild.id);
        const embed = new MessageEmbed().setDescription(help);
        msg.reply({ embeds: [embed] });
    }
}