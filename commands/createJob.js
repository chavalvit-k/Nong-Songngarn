const jobModel = require("../models/schema");

module.exports = {
    name: "add",
    description: "add job",
    execute(guild, args, client) {
        let name = args.join(" ");  // job name
		if(typeof name !== "string" || name.length < 0){
			msg.reply("Invalid Job Name");
            return ;
		}
        // const author = client.user.tag;
        // console.log(author);
        client.once("messageCreate", async (msg, client) => {
            if(msg.author.bot) return ;
        //    console.log(msg.author.tag);
            let deadline = msg.content;
            deadline = deadline.split(" ");
            let day = deadline[0]; 
            let hour = deadline[1]; // optional
        
            if(day.includes("/")) day = day.split("/");               
            else if(day.includes("-")) day = day.split("-");

            //  change format from dd/mm/yyyy to yyyy/mm/dd
            let dayFormated = `${day[2]} ${day[1]} ${day[0]}`; 
            let deadlineDate = new Date(dayFormated); 

            if(deadlineDate.toString() === "Invalid Date"){
                msg.reply("Invalid Date. Please type in this form DD/MM/YYYY");
                return ;
            }

            if(hour) deadlineDate.setHours(hour); 
            deadlineDate = deadlineDate.toString();

            // get latest id
            let latestId = (await jobModel.find().sort({"_id": -1}).limit(1)); 

            if(latestId.length === 0) latestId = 0;
            else latestId = latestId[0].jobId;

            let job = await jobModel.create({
                jobId: latestId + 1,
                serverId: guild.id,
                jobName: name,
                jobDeadlineDay: deadlineDate
            })
            job.save();
            msg.reply(`Create job ${job.jobName} completed deadline on ${job.jobDeadlineDay}.`);
            
        })

    }
};