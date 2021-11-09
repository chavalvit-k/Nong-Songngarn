require("dotenv").config();
module.exports = {
	name: 'messageCreate',
	execute(msg) {
		const prefix = process.env.PREFIX;
    	if(msg.author.bot) return ; // send by bot itself
		if(!msg.content.startsWith(prefix)) return ;

		const command = msg.content.slice(prefix.length).trim().split(/ +/);
		const commandName = command.shift().toLowerCase();

		if(command.length === 0) return ;

		if(commandName === "สวัสดี"){
			switch (command[0]){
				case "วันจันทร์":
					msg.reply("สวัสดีวันจันทร์ ขอให้มีความรักล้นเทในหัวใจ เริ่มต้นสัปดาห์อย่างสดชื่นแจ่มใสไปด้วยกัน");
					break;
				case "วันอังคาร":
					msg.reply("สวัสดีวันอังคาร ขอให้รู้ว่าคิดถึง ห่วงใยเป็นที่หนึ่ง มีแต่หัวใจคะนึงหา");
					break;
				case "วันพุธ":
					msg.reply("สวัสดีวันพุธ ขอให้สุขทุกที่ โชคดีทุกหน ไร้ซึ่งความจน มากล้นด้วยคนรัก");
					break;
				case "วันพฤหัส":
					msg.reply("สวัสดีวันพฤหัสบดี มีคนอยู่ตรงนี้ห่วงใย ถึงแม้จะอยู่ห่างไกล แต่ไม่เคยไม่คิดถึงเธอเลย");
					break;
				case "วันพฤหัสบดี":
					msg.reply("สวัสดีวันพฤหัสบดี มีคนอยู่ตรงนี้ห่วงใย ถึงแม้จะอยู่ห่างไกล แต่ไม่เคยไม่คิดถึงเธอเลย");
					break;
				case "วันศุกร์":
					msg.reply("สวัสดีวันศุกร์ ส่งใจมาทักทายกัน จะได้รู้ว่ายังมีฉัน ที่ห่วงใยเธอ");
					break;
				case "วันเสาร์":
					msg.reply("สวัสดีวันเสาร์ ขอให้รักของเราสดใส จะอยู่ใกล้หรือห่างไกล ยังคงห่วงใยเสมอมา");
					break;
				case "วันอาทิตย์":
					msg.reply("สวัสดีวันอาทิตย์ ใช้ชีวิตไม่ต้องหรูหรา พอดีในสิ่งที่ตัวเราสร้างมา เจอคนที่รักและห่วงใยกันเท่านั้นพอ");
					break;
				default:
					msg.reply("ซาหวาดดีค้าบเชี่ยวชาญ");		
			}	
		}

	},
};