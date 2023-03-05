const mongoose = require('mongoose');

const FollowUnfollowShema = new mongoose.Schema({
    followers :[ { type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

})



//export Schema
module.exports = mongoose.model('FollowUnfollow', FollowUnfollow);
//controller