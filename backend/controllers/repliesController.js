const replyModel = require("../models/replies")
const tweetsModel = require("../models/tweets")


const createNewReply = async (req,res)  => {
    try {
        const tweetId = req.params.id
        const userId = req.token.userId
        const {reply} = req.body
        //check if tweet exists
        const tweet = await tweetsModel.findById(tweetId)
        if (!tweet) {
            return res.status(404).json({
                success: false,
                message: `The tweet the id => ${tweetId} is not found`
            })
        }
        //create reply
        const newReply = new replyModel({
            reply,
            replyCreator:userId,
        })
        await newReply.save()
        // add the reply to the tweet
        tweet.reply.push(newReply._id)
        await tweet.save()

        res.status(201).json({success:true,message: "Reply created successfully",reply: newReply})
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
            }


        
    }
    module.exports = {createNewReply}
