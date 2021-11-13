module.exports = {
    name: "update2",
    description: "chain command from update.js",
    execute(id, author, client) {
        client.once("messageCreate", async (msg) => {

            // message did not send by command initiator
            if(msg.author.tag !== author){
                client.commands.get("update2").execute(id, author, client);
                return ;
            }

            // user use another command
            if(msg.content.includes("-")) return ;

            if(msg.content === "cancel"){;
                msg.reply("You exit this command.");
                return ;
            }
            
            let num = Number(msg.content);  
            if(!Number.isInteger(num) || num<1 || num>7){
                msg.reply("Invalid Job Id");
                client.commands.get("update2").execute(id, author, client);
                return ;
            }

            const info = `\nYou can type "cancel" to exit this command.`;

            if(num === 1) msg.reply(`Type data in this format: <name> ${info}`);
            else if(num === 2) msg.reply(`Type data in this format: <deadline_day> ${info}`);
            else if(num === 3) msg.reply(`Type data in this format: <deadline_hour> ${info}`);
            else if(num === 4) msg.reply(`Type data in this format: <name>,<deadline_day> ${info}`);
            else if(num === 5) msg.reply(`Type data in this format: <name>,<deadline_hour> ${info}`);
            else if(num === 6) msg.reply(`Type data in this format: <deadline_day>,<deadline_hour> ${info}`);
            else if(num === 7) msg.reply(`Type data in this format: <name>,<deadline_day>,<deadline_hour> ${info}`);
            
            client.commands.get("update3").execute(id, num, author, client);

        })
    }
};
