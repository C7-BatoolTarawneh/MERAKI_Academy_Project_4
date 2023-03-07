const mongoose = require("mongoose")

const repliesSchema = new mongoose.Schema({
    reply: [{ type: mongoose.Schema.Types.ObjectId , ref:"Reply" }],
    replyCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    caption: { type: String, required: true },
    replyImage: { type: String }, 

  });
  
  module.exports = mongoose.model("Reply", repliesSchema);
  