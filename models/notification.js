const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    serverId: { type: String, require: true},
    channelId: { type: String, require: true},
    notificationSwitch: { type: Boolean, require: true},
    notificationTime: { type: Number, require: true}
})

const model = mongoose.model("notificationModel", schema);

module.exports = model;