const express =  require('express');
const {
    addFollowing,
    removeFollowing,
    
} =require("../controllers/followUnfollowController")

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const followUnfollowRouter = express.Router()

followUnfollowRouter.post("/addFollowing", authentication, addFollowing)
followUnfollowRouter.delete("/removeFollowing", authentication, removeFollowing)







module.exports = followUnfollowRouter