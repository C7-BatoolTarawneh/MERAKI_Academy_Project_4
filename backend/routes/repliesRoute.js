const express = require('express')

const {createNewReply,getRepliesByTweetId,likeReply} =require("../controllers/repliesController")

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const repliesRouter = express.Router()

repliesRouter.post("/createReply/:id",authentication,authorization("CREATE_REPLY"),createNewReply)
// repliesRouter.post("/replyToReply/:id",authentication,authorization("REPLY_A_REPLY"),replyOfReply)
repliesRouter.put("/likeReply/:id",authentication,authorization("LIKE_REPLY"),likeReply)
repliesRouter.get("/:id",authentication,authorization("GET_REPLIES"),getRepliesByTweetId)


module.exports =repliesRouter