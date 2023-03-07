const express = require('express')

const {createNewReply} =require("../controllers/repliesController")

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const repliesRouter = express.Router()

repliesRouter.post("/createReply/:id",authentication,authorization("CREATE_REPLY"),createNewReply)


module.exports =repliesRouter