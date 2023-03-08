const express = require('express')

const {createNewReply,getRepliesByTweetId,likeReply,unlikeReply,updateReply,deleteReplyByTweetIdAndReplyId} =require("../controllers/repliesController")

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const repliesRouter = express.Router()

repliesRouter.post("/createReply/:id",authentication,authorization("CREATE_REPLY"),createNewReply)
// repliesRouter.post("/replyToReply/:id",authentication,authorization("REPLY_A_REPLY"),replyOfReply)
repliesRouter.put("/likeReply/:id",authentication,authorization("LIKE_REPLY"),likeReply)
repliesRouter.get("/:id",authentication,authorization("GET_REPLIES"),getRepliesByTweetId)
repliesRouter.put("/likeReply/:id", authentication, authorization("LIKE_REPLY"), likeReply);
repliesRouter.put("/unlikeReply/:id",authentication,authorization("UNLIKE_REPLY"),unlikeReply)
repliesRouter.put('/updateReply/:id', authentication, authorization('UPDATE_REPLY'), updateReply);
repliesRouter.delete("/:tweetId/:replyId",authentication,authorization("DELETE_REPLY"),deleteReplyByTweetIdAndReplyId)

module.exports =repliesRouter