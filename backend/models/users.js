const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true,trim: true, minLength: 3 },

  age: { type: Number, minLength: 18 },

  email: { type: String, required: true, unique: true,trim: true,validate:{
    validator: function (v) {
        return /\S+@+\S+\.\S+/.test(v)  
    } ,
    message:"Please enter a valid email address"},
  },
  password: { type: String, required: true ,trim: true,min: 6 },

  profilePicture: { type: String },

  coverPicture: { type: String },

  followAction:   { type: mongoose.Schema.Types.ObjectId, ref: "FollowUnfollow" },

  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },

});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("User", userSchema);
