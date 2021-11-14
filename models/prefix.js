const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    serverId: { type: String, require: true},
    prefix: {type: String, require: true}
})

const model = mongoose.model("prefixModel", schema);

module.exports = model;