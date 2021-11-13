module.exports = {
    name: "help-init",
    description: "help init",
    execute(guild){
        const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT');
    	channel.send(`You can use these 4 commands\n1. -get\n2. -add\n3. -update\n4. -delete`);       
    }
}