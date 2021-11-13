const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "สวัสดี",
    description: "greetings",
    execute(msg, args){
        const embed = new MessageEmbed().setColor("#add79b");
        if(args.length === 1){
            switch (args[0]){
                case "วันจันทร์":
                    embed.setDescription("สวัสดีวันจันทร์ ขอให้มีความรักล้นเทในหัวใจ เริ่มต้นสัปดาห์อย่างสดชื่นแจ่มใสไปด้วยกัน");
                    msg.reply({ embeds: [embed] });
                    break;
                case "วันอังคาร":
                    embed.setDescription("สวัสดีวันอังคาร ขอให้รู้ว่าคิดถึง ห่วงใยเป็นที่หนึ่ง มีแต่หัวใจคะนึงหา");
                    msg.reply({ embeds: [embed] });
                    break;
                case "วันพุธ":
                    embed.setDescription("สวัสดีวันพุธ ขอให้สุขทุกที่ โชคดีทุกหน ไร้ซึ่งความจน มากล้นด้วยคนรัก");
                    msg.reply({ embeds: [embed] });
                    break;
                case "วันพฤหัส":
                    embed.setDescription("สวัสดีวันพฤหัสบดี มีคนอยู่ตรงนี้ห่วงใย ถึงแม้จะอยู่ห่างไกล แต่ไม่เคยไม่คิดถึงเธอเลย");
                    msg.reply({ embeds: [embed] });
                    break;
                case "วันพฤหัสบดี":
                    embed.setDescription("สวัสดีวันพฤหัสบดี มีคนอยู่ตรงนี้ห่วงใย ถึงแม้จะอยู่ห่างไกล แต่ไม่เคยไม่คิดถึงเธอเลย");
                    msg.reply({ embeds: [embed] });
                    break;
                case "วันศุกร์":
                    embed.setDescription("สวัสดีวันศุกร์ ส่งใจมาทักทายกัน จะได้รู้ว่ายังมีฉัน ที่ห่วงใยเธอ");
                    msg.reply({ embeds: [embed] });
                    break;
                case "วันเสาร์":
                    embed.setDescription("สวัสดีวันเสาร์ ขอให้รักของเราสดใส จะอยู่ใกล้หรือห่างไกล ยังคงห่วงใยเสมอมา");
                    msg.reply({ embeds: [embed] });
                    break;
                case "วันอาทิตย์":
                    embed.setDescription("สวัสดีวันอาทิตย์ ใช้ชีวิตไม่ต้องหรูหรา พอดีในสิ่งที่ตัวเราสร้างมา เจอคนที่รักและห่วงใยกันเท่านั้นพอ");
                    msg.reply({ embeds: [embed] });
                    break;
                default:
                    embed.setDescription("สวัสดีครับ");
                    msg.reply({ embeds: [embed] });
            }
        }
        else{
            embed.setDescription("สวัสดีครับ");
            msg.reply({ embeds: [embed] });
        }    
    }
}