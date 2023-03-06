const express = require('express');
const {createNewTweet,getTweetsByWriter,getAllTweets,updateTweetById,deleteTweetById} = require("../controllers/tweetsController")

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


const tweetsRouter = express.Router()

tweetsRouter.post("/create",authentication,
authorization("Create_Tweets"),createNewTweet)

tweetsRouter.get("/search_1", getTweetsByWriter)//  http://localhost:5000/tweets/search_1?writer=

tweetsRouter.get("/",authentication,getAllTweets)
tweetsRouter.put("/update/:id",authentication,authorization("UPDATE_TWEET"),updateTweetById)
tweetsRouter.delete("/delete/:id",authentication,authorization("DELETE_TWEET_BY_ID"),deleteTweetById)
module.exports = tweetsRouter;