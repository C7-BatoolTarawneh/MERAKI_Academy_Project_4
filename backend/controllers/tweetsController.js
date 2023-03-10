const tweetsModel = require("../models/tweets");
const userModel = require("../models/users");
const replyModel = require("../models/replies");

/*const createNewTweet = (req, res) => {
  const { image, description } = req.body;
  const writer = req.token.userId;
  console.log("REQUEST TOCK: ",req.token)
  const newTweet = new tweetsModel({
    image,
    description,
    writer,
  });

  newTweet
    .save()
    
    .then((tweet) => {
      
      res.status(201).json({
        success: true,
        message: `Tweet created`,
        tweet: tweet,

       
        
      });
      console.log("RESSSSSSS::  ",res)
    })

    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};*/


const createNewTweet = (req, res) => {
  const { image, description } = req.body;
  const writer = req.token.userId;
  const newTweet = new tweetsModel({
    image,
    description,
    writer,
  });

  newTweet
    .save()
    .then((tweet) => {
      // Fetch the writer's User document to get the username
      userModel
        .findById(writer)
        .select("userName profilePicture")
        .then((user) => {
          res.status(201).json({
            success: true,
            message: `Tweet created`,
            tweet: {
              _id: tweet._id,
              image: tweet.image,
              description: tweet.description,
              writer: tweet.writer,
              writerUserName: user.userName, // include the writer's username in the response
              writerProfilePicture: user.profilePicture, // include the writer's profile picture in the response
              reply: tweet.reply,
              likes: tweet.likes,
              retweet: tweet.retweet,
              createdAt: tweet.createdAt,
              updatedAt: tweet.updatedAt,
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


const getTweetsByWriter = (req, res) => {
  let userId = req.query.writer;
  

  tweetsModel
    .find({ writer: userId })
    .then((tweets) => {
      if (!tweets.length) {
        return res.status(404).json({
          success: false,
          message: `The writer: ${userId} has no tweets`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the tweets for the writer: ${userId}`,
        tweets: tweets,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

/*
const getAllTweets = (req, res) => {
  const userId = req.token.userId;
  
  tweetsModel
    .find()
    .populate("reply", "-_id -__v")
    .then((tweets) => {
      if (tweets.length) {
        res.status(200).json({
          success: true,
          message: "All tweets ",
          userId: userId,
          tweets: tweets,
          
        });
        console.log("RESSS: " ,tweets[0].writer.userName)
      } else {
        res.status(200).json({ success: false, message: "no tweets so far" });
      }
    })
    // console.log(res)
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
*/

const getAllTweets = (req, res) => {
  const userId = req.token.userId;

  tweetsModel
    .find()
    .populate([
      {
        path: "reply",
        select: "-_id -__v",
      },
      {
        path: "writer",
        select: "userName profilePicture", // include the profile picture field in the response
      },
    ])
    .then((tweets) => {
      if (tweets.length) {
        res.status(200).json({
          success: true,
          message: "All tweets ",
          userId: userId,
          tweets: tweets,
        });
      } else {
        res.status(200).json({ success: false, message: "no tweets so far" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};



const updateTweetById = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  tweetsModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newTweet) => {
      if (!newTweet) {
        return res.status(404).json({
          success: false,
          message: `The tweet with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Tweet updated`,
        article: newTweet,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteTweetById = (req, res) => {
  const id = req.params.id;
  tweetsModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The tweet with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `tweet deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteTweetByWriter = (req, res) => {
  const writer = req.params.id;
  tweetsModel
    .deleteMany({ writer })
    .then((result) => {
      console.log(writer);
      if (!result.deletedCount) {
        return res
          .status(404)
          .json({ success: false, message: `writer not found` });
      }
      res.status(200).json({
        success: true,
        message: `this is the deleted tweet by ${writer}`,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: `Server Error`, err: err });
    });
};

const likeTweet = (req, res) => {
  const tweetId = req.params.id;
  const userId = req.token.userId;
  //search for the tweets with cpecific id
  tweetsModel
    .findById(tweetId)
    .then((tweet) => {
      if (!tweet) {
        return res.status(404).json({
          success: false,
          message: `the tweet with the id => ${tweetId} not found`,
        });
      }
      // check if it is liked or not, is user in likes array or not?
      const alreadyLiked = tweet.likes.includes(userId);
      if (alreadyLiked) {
        console.log("aaa");
        return res.status(404).json({ success: false, message:`the tweet already liked by ${userId}`})
      } 
        tweet.likes.push(userId);
      

      tweet.save().then((updatedTweet) => {
        res.status(200).json({
          success: true,
          message: `Tweet liked`,
          tweet: updatedTweet,
        });
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          success: false,
          message: `Server Error`,
          error: error.message,
        });
    });
};

const unlikeTweet = (req, res) => {
    const tweetId = req.params.id;
    const userId = req.token.userId;
    //search for the tweets with specific id
    tweetsModel
      .findById(tweetId)
      .then((tweet) => {
        if (!tweet) {
          return res.status(404).json({
            success: false,
            message: `the tweet with the id => ${tweetId} not found`,
          });
        }
        // check if it is liked or not, is user in likes array or not?
        const alreadyLiked = tweet.likes.includes(userId);
        if (!alreadyLiked) {
          return res.status(400).json({
            success: false,
            message: `The tweet is not liked by the user`,
          });
        }
        tweet.likes = tweet.likes.filter((id) => id.toString() !== userId);
  
        tweet.save().then((updatedTweet) => {
          res.status(200).json({
            success: true,
            message: `Tweet unliked`,
            tweet: updatedTweet,
          });
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          error: error.message,
        });
      });
  };
  
  

module.exports = {
  createNewTweet,
  getTweetsByWriter,
  getAllTweets,
  updateTweetById,
  deleteTweetById,
  deleteTweetByWriter,
  likeTweet,
  unlikeTweet
};
