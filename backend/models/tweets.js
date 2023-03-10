const mongoose = require("mongoose");

const tweetsSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    retweet: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    image: { type: String }, 
},
  { timestamps: true }
);

module.exports = mongoose.model("Tweets", tweetsSchema);
