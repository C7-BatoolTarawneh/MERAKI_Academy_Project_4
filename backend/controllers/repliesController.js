const replyModel = require("../models/replies")
const tweetsModel = require("../models/tweets")


// twitter should accept text or picture to be sent

const createNewReply = async (req,res)  => {
    try {
        const tweetId = req.params.id
        const userId = req.token.userId
        const {caption,replyImage} = req.body
        //check if reply is empty or includes many of whitespace
        
        //check if tweet exists
        const tweet = await tweetsModel.findById(tweetId)
        if (!tweet) {
            return res.status(404).json({
                success: false,
                message: `The tweet the id => ${tweetId} is not found`
            })
        }
        if( (!caption || !caption.trim()) && ( !replyImage || !replyImage.trim())) 
        {
            return res.status(400).json({success: false, message:"Reply content cannot be empty, caption or image or both are required"})
        }
        //create reply
        const newReply = new replyModel({
            replyCreator:userId,
            caption,
            replyImage,
        })
        await newReply.save()
        // add the reply to the tweet
        tweet.reply.push(newReply._id)
        await tweet.save()

        res.status(201).json({success:true,message: "Reply created successfully",reply: newReply})
    }
    catch(error) {
        console.log("aaa");
        res.status(500).json({
            success: false,
            message: `Server Error`,
            error: error.message,
          });
            }


        
    }
    module.exports = {createNewReply}
