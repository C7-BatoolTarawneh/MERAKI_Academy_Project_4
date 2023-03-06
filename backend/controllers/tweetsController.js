const tweetsModel = require("../models/tweets");
const userModel = require("../models/users");
const replyModel = require("../models/replies");
const { deleteUser } = require("./usersController");

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
      // console.log("Tweet")
      res.status(201).json({
        success: true,
        message: `Tweet created`,
        tweet: tweet,
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

const getAllTweets = (req, res) => {
  const userId = req.token.userId;
  tweetsModel
    .find()
    .populate("reply", "-_id -__v")
    .exec()
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
     
        tweet.likes.push(userId);
      

      tweet.save().then((updatedTweet) => {
        res.status(200).json({
          success: true,
          message: `Tweet ${alreadyLiked ? "unliked" : "liked"} `,
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

module.exports = {
  createNewTweet,
  getTweetsByWriter,
  getAllTweets,
  updateTweetById,
  deleteTweetById,
  deleteTweetByWriter,
  likeTweet,
};
