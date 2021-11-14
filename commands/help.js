const { MessageEmbed } = require("discord.js");
const helpInformation = require("../utils/helpInformation");

module.exports = {
    name: "help",
    description: "help document",
    async execute(msg){

        const help = await helpInformation(msg.guild.id);
        const embed = new MessageEmbed().setColor("#add79b").setDescription(help);
        msg.reply({ embeds: [embed] });

    }
}