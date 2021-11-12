const jobModel = require("../models/schema");

module.exports = {
    name: "add2",
    description: "chain command from add.js",
    execute(name, author, client){
        client.once("messageCreate", async (msg) => {
            // console.log(msg.author.tag);
           
            // message did not send by command initiator
            if(msg.author.tag !== author){
                client.commands.get("add2").execute(name, author, client);
                return ;
            }

            if(msg.content === "cancel"){;
                msg.reply("You exit this command.");
                return ;
            }

            let deadline = msg.content;
            deadline = deadline.split(" ");
            let day = deadline[0]; 
            let hour = Number(deadline[1]); // optional
        
            if(day.includes("/")) day = day.split("/");               
            else if(day.includes("-")) day = day.split("-");

            //  change format from dd/mm/yyyy to yyyy/mm/dd
            let dayFormated = `${day[2]} ${day[1]} ${day[0]}`; 
            let deadlineDate = new Date(dayFormated); 

            if(deadlineDate.toString() === "Invalid Date"){
                msg.reply(`Invalid date. Please type date in this format: DD/MM/YYYY\nYou can type "cancel" to exit this command.`);
                client.commands.get("add2").execute(name, author, client);
                return ;
            }

            if(hour){
                if(!Number.isInteger(hour) || hour < 1 || hour > 23){
                    msg.reply(`Invalid hour. Please type hour in 1-23 range\nYou can type "cancel" to exit this command.`)
                    client.commands.get("add2").execute(name, author, client);
                    return ;
                }
                deadlineDate.setHours(hour);  
            }

            // get latest id
            let latestId = (await jobModel.find().sort({"_id": -1}).limit(1)); 

            if(latestId.length === 0) latestId = 0;
            else latestId = latestId[0].jobId;

            let job = await jobModel.create({
                jobId: latestId + 1,
                serverId: msg.guild.id,
                jobName: name,
                jobDeadlineDay: deadlineDate.getTime()
            })
        job.save();
        msg.reply(`Create job completed!\nName: ${job.jobName}\nDeadline: ${new Date(job.jobDeadlineDay).toString()}.`);
            
        })

    }
}