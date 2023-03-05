const mongoose = require('mongoose');

const rolesShema = new mongoose.Schema({
    followers :[ { type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

})



//export Schema
module.exports = mongoose.model('FollowUnfollow', rolesShema);
//controller