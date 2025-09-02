const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
    name: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("List", listSchema);
