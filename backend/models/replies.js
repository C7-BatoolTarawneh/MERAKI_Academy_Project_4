const mongoose = require("mongoose")

const repliesSchema = new mongoose.Schema({
    reply: { type: String, required: true },
    replyCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });
  
  module.exports = mongoose.model("Reply", repliesSchema);
  