const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    jobId: { type: Number, require: true},
    serverId: { type: String, require: true},
    jobName: { type: String, require: true},
    jobDeadline: { type: Number, require: true},
});

const model = mongoose.model("jobModel", schema);

module.exports = model;