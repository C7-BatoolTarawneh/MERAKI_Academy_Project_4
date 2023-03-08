const mongoose = require('mongoose');

const retweetSchema = new mongoose.Schema({
    tweet : [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweets" }],
    retweeter : [{ type: mongoose.Schema.Types.ObjectId , ref:"User"}]
})

module.exports = mongoose.model("Retweet",retweetSchema)