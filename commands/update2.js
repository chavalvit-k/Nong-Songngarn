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

            if(num === 1) msg.reply(`Type data in this format: <name>.`);
            else if(num === 2) msg.reply(`Type data in this format: <deadline_day>.`);
            else if(num === 3) msg.reply(`Type data in this format: <deadline_hour>.`);
            else if(num === 4) msg.reply(`Type data in this format: <name> <deadline_day>.`);
            else if(num === 5) msg.reply(`Type data in this format: <name> <deadline_hour>.`);
            else if(num === 6) msg.reply(`Type data in this format: <deadline_day> <deadline_hour>.`);
            else if(num === 7) msg.reply(`Type data in this format: <name> <deadline_day> <deadline_hour>.`);
            
            client.commands.get("update3").execute(id, num, author, client);

        })
    }
};
