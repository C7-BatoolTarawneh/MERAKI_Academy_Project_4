const express = require('express')

const {makeRetweet} = require("../controllers/retweetController")

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const retweetRouter = express.Router()

retweetRouter.post("/:id",authentication,authorization("RETWEET"),makeRetweet)

module.exports =retweetRouter