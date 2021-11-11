const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    jobId: { type: Number, require: true, unique: true},
    serverId: { type: String, require: true},
    jobName: { type: String, require: true},
    jobDeadlineDay: { type: String, require: true},
});

const model = mongoose.model("jobModel", schema);

module.exports = model;