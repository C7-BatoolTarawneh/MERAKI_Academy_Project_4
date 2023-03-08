const mongoose = require("mongoose")

const repliesSchema = new mongoose.Schema({
    reply: [{ type: mongoose.Schema.Types.ObjectId , ref:"Reply" }],
    replyCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    caption: { type: String, required: true ,trim: true , validate:{
        validator: function(v){
            return /[^\s]/.test(v)
        },
    }},
    replyImage: { type: String }, 
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" ,unique :true}],

  });
  
  module.exports = mongoose.model("Reply", repliesSchema);
  