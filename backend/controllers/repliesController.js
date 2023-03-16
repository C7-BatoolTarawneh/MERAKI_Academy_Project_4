const replyModel = require("../models/replies");
const tweetsModel = require("../models/tweets");

// twitter should accept text or picture to be sent

const createNewReply = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.token.userId;
    
    const { caption, replyImage } = req.body;
    //check if reply is empty or includes many of whitespace

    //check if tweet exists
    const tweet = await tweetsModel.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        success: false,
        message: `The tweet the id => ${tweetId} is not found`,
      });
    }
    if ((!caption || !caption.trim()) && (!replyImage || !replyImage.trim())) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Reply content cannot be empty, caption or image or both are required",
        });
    }
    //create reply
    const newReply = new replyModel({
      replyCreator: userId,
      caption,
      replyImage,
      replyName:userId.userName
    });
    await newReply.save();
    // add the reply to the tweet
    tweet.reply.push(newReply._id);
    await tweet.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Reply created successfully",
        reply: newReply,
      });
  } catch (error) {
    console.log("aaa");
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: error.message,
    });
  }
};



const getRepliesByTweetId = async (req, res) => {
  try {
    const tweetId = req.params.id;
    if (!tweetId) {
      return res.status(400).json({
        success: false,
        message: `Invalid tweet id: ${tweetId}`,
      });
    }
    const tweet = await tweetsModel.findById(tweetId).populate({
      path: "reply",
      populate: {
        path: "replyCreator",
        select: "userName profilePicture",
      },
    });

    if (!tweet) {
      return res.status(404).json({
        success: false,
        message: `The tweet with the id => ${tweetId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `All replies for the tweet with id ${tweetId}`,
      replies: tweet.reply,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: error.message,
    });
  }
};


const likeReply = async (req, res) => {
  try {
    const replyId = req.params.id;
    const userId = req.token.userId;

    // Find the reply by ID
    const reply = await replyModel.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: `The reply with id ${replyId} is not found`,
      });
    }

    // Check if the reply is already liked by the user
    const alreadyLiked = reply.likes.includes(userId);
    if (alreadyLiked) {
      return res.status(400).json({
        success: false,
        message: `The reply is already liked by the user`,
      });
    }

    // Add the user ID to the likes array of the reply
    reply.likes.push(userId);
    await reply.save();

    res.status(200).json({
      success: true,
      message: "Reply liked",
      reply: reply,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const unlikeReply = async (req, res) => {
  try {
    const replyId = req.params.id;
    const userId = req.token.userId;

    // Find the reply by ID
    const reply = await replyModel.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: `The reply with id ${replyId} is not found`,
      });
    }

    // Check if the reply is already liked by the user
    const alreadyLiked = reply.likes.includes(userId);
    if (!alreadyLiked) {
      return res.status(400).json({
        success: false,
        message: `The reply is not liked by the user`,
      });
    }

    // Remove the user ID from the likes array of the reply
    reply.likes = reply.likes.filter((id) => id.toString() !== userId);
    await reply.save();

    res.status(200).json({
      success: true,
      message: "Reply unliked",
      reply: reply,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateReply = async (req, res) => {
  try {
    const replyId = req.params.id;
    const userId = req.token.userId;
    const { caption, replyImage } = req.body;

    // Find the reply by ID
    const reply = await replyModel.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: `The reply with id ${replyId} is not found`,
      });
    }

    // Check if the user is the creator of the reply
    if (reply.replyCreator.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: `You are not authorized to update this reply`,
      });
    }

    // Update the reply
    reply.caption = caption;
    reply.replyImage = replyImage;
    await reply.save();

    res.status(200).json({
      success: true,
      message: "Reply updated",
      reply: reply,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteReplyByTweetIdAndReplyId = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const replyId = req.params.replyId;
    if (!tweetId || !replyId) {
      return res.status(400).json({
        success: false,
        message: `Invalid tweet id or reply id: tweetId => ${tweetId}, replyId => ${replyId}`,
      });
    }

    // Find the tweet by ID
    const tweet = await tweetsModel.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({
        success: false,
        message: `The tweet with the id => ${tweetId} not found`,
      });
    }

    // Find the reply by ID
    const reply = await replyModel.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: `The reply with id => ${replyId} not found`,
      });
    }

    // Check if the reply belongs to the tweet
    if (!tweet.reply.includes(replyId)) {
      return res.status(400).json({
        success: false,
        message: `The reply with id => ${replyId} does not belong to the tweet with id => ${tweetId}`,
      });
    }

    // Delete the reply
    await replyModel.findByIdAndDelete(replyId);

    // Remove the reply ID from the tweet's reply array
    tweet.reply = tweet.reply.filter((id) => id.toString() !== replyId);
    await tweet.save();

    res.status(200).json({
      success: true,
      message: `The reply with id => ${replyId} related to the tweet with id => ${tweetId} is deleted`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: error.message,
    });
  }
};

module.exports = {
  createNewReply,
  getRepliesByTweetId,
  likeReply,
  unlikeReply,
  updateReply,
  deleteReplyByTweetIdAndReplyId,
};
