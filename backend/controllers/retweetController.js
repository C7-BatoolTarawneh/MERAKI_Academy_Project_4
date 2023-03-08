const tweetsModel = require("../models/tweets");
const userModel = require("../models/users");
const retweetModel = require("../models/retweet");

const makeRetweet = async (req, res) => {
  const retweeterId = req.token.userId;
  const tweetId = req.params.id;
  try {
    // check if user has already retweeted a tweet
    const existingRetweet = await retweetModel.findOne({
      tweet: tweetId,
      retweeter: retweeterId,
    });
    if (existingRetweet) {
      return res.status(400).json({
        success: false,
        message: `Retweet already retweeted`,
      });
    }
    const tweet = await tweetsModel.findById(tweetId);
    if (!tweet) {
      console.log(tweetId);
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    const retweet = new retweetModel({
      tweet: tweetId,
      retweeter: retweeterId,
    });
    //update tweet
    await retweet.save();
    res.status(200).json({
      success: true,
      message: "retweet created successfully",
      retweet: retweet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: error.message,
    });
  }
};

module.exports = { makeRetweet };
