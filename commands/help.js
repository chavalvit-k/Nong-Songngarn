module.exports = {
    name: "help",
    description: "help document",
    execute(msg){
        msg.channel.send(`You can use these 4 commands\n1. -get\n2. -add\n3. -update\n4. -delete`);
    }
}