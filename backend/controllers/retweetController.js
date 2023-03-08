const tweetsModel = require("../models/tweets");
const userModel = require("../models/users");
const retweetModel = require("../models/retweet");


const makeRetweet = async (req, res) => {
    try {
        const tweet = await tweetsModel.findById(req.params.id);    
        if (!tweet){
           return  res.status(404).json({message:"Tweet not found"})
        }
        //check if the tweet has been retweeted already
        const existingRetweet = await retweetModel.findOne({tweet:tweet._id,retweeter:req.user._id})
        if(existingRetweet)
        {
            return res.status(404).json({message:"you have already retweeted this tweet"})
        }

        const retweet = new retweetModel({
            tweet : tweet._id,
            retweeter: req.user._id
        })
        await retweet.save()
        //update tweet
        await tweet.save()
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: `Server Error`,
            error: error.message,
          });
        }
    }

        module.exports = {makeRetweet}